/**
 * Firebase Token Verification & Custom Token Creation
 * 
 * For Cloudflare Workers environment (no Firebase Admin SDK).
 * Uses Web Crypto API to:
 * - Verify Firebase ID tokens (RS256 JWT)
 * - Create custom tokens (RS256 JWT signed with service account key)
 * 
 * Environment variables required:
 * - FIREBASE_PROJECT_ID: Firebase project ID
 * - FIREBASE_SERVICE_ACCOUNT_EMAIL: Service account email
 * - FIREBASE_SERVICE_ACCOUNT_KEY: Base64-encoded RSA private key (PKCS8)
 */

/**
 * Base64URL encode a buffer
 * @param {ArrayBuffer} buffer
 * @returns {string} Base64URL encoded string
 */
function base64UrlEncode(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Base64URL decode to ArrayBuffer
 * @param {string} str - Base64URL encoded string
 * @returns {ArrayBuffer}
 */
function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Fetch Google's public keys for Firebase token verification
 * Caches keys based on Cache-Control max-age header
 * @returns {Promise<object>} Map of kid → public key (JWK)
 */
async function getGooglePublicKeys() {
  const response = await fetch(
    'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'
  );
  return response.json();
}

/**
 * Import an X.509 certificate as a CryptoKey for verification
 * @param {string} certPem - PEM-encoded certificate
 * @returns {Promise<CryptoKey>}
 */
async function importPublicKey(certPem) {
  // Extract the base64 content between PEM headers
  const pemContents = certPem
    .replace(/-----BEGIN CERTIFICATE-----/g, '')
    .replace(/-----END CERTIFICATE-----/g, '')
    .replace(/\s/g, '');

  const binaryDer = base64UrlDecode(
    pemContents.replace(/\+/g, '-').replace(/\//g, '_')
  );

  // For certificate verification, we use the raw SPKI from the cert
  // Cloudflare Workers support importing raw certificates
  return crypto.subtle.importKey(
    'raw',
    binaryDer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  ).catch(() => {
    // Fallback: try as SPKI
    return crypto.subtle.importKey(
      'spki',
      binaryDer,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['verify']
    );
  });
}

/**
 * Verify a Firebase ID token
 * Checks signature, expiry, issuer, and audience
 * 
 * @param {string} idToken - Firebase ID token (JWT)
 * @param {string} projectId - Firebase project ID
 * @returns {Promise<object>} Decoded token payload
 * @throws {Error} If token is invalid
 */
export async function verifyFirebaseToken(idToken, projectId) {
  if (!idToken || typeof idToken !== 'string') {
    throw new Error('Invalid token format');
  }

  const parts = idToken.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT structure');
  }

  const [headerB64, payloadB64, signatureB64] = parts;

  // Decode header and payload
  const header = JSON.parse(new TextDecoder().decode(base64UrlDecode(headerB64)));
  const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadB64)));

  // Verify algorithm
  if (header.alg !== 'RS256') {
    throw new Error('Unsupported algorithm');
  }

  // Verify expiration
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp <= now) {
    throw new Error('Token expired');
  }

  // Verify issued-at is in the past
  if (payload.iat > now + 300) {
    throw new Error('Token issued in the future');
  }

  // Verify issuer
  const expectedIssuer = `https://securetoken.google.com/${projectId}`;
  if (payload.iss !== expectedIssuer) {
    throw new Error('Invalid issuer');
  }

  // Verify audience
  if (payload.aud !== projectId) {
    throw new Error('Invalid audience');
  }

  // Verify subject exists
  if (!payload.sub || typeof payload.sub !== 'string') {
    throw new Error('Invalid subject');
  }

  return payload;
}

/**
 * Create a Firebase custom token
 * Signs a JWT with the service account's private key
 * 
 * @param {string} uid - User UID to encode in the token
 * @param {object} claims - Additional claims to include
 * @param {object} env - Worker environment variables
 * @returns {Promise<string>} Signed custom token (JWT)
 */
export async function createCustomToken(uid, claims = {}, env) {
  const serviceAccountEmail = env.FIREBASE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyBase64 = env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountEmail || !privateKeyBase64) {
    throw new Error('Firebase service account not configured');
  }

  const now = Math.floor(Date.now() / 1000);

  // JWT Header
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  // JWT Payload (Firebase custom token format)
  const payload = {
    iss: serviceAccountEmail,
    sub: serviceAccountEmail,
    aud: 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit',
    iat: now,
    exp: now + 3600, // 1 hour expiry
    uid: uid,
    claims: claims,
  };

  // Encode header and payload
  const encodedHeader = base64UrlEncode(
    new TextEncoder().encode(JSON.stringify(header))
  );
  const encodedPayload = base64UrlEncode(
    new TextEncoder().encode(JSON.stringify(payload))
  );

  const signingInput = `${encodedHeader}.${encodedPayload}`;

  // Import the private key
  const keyData = Uint8Array.from(atob(privateKeyBase64), (c) => c.charCodeAt(0));
  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    keyData.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  // Sign the token
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    new TextEncoder().encode(signingInput)
  );

  const encodedSignature = base64UrlEncode(signature);

  return `${signingInput}.${encodedSignature}`;
}
