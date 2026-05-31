/**
 * Telegram Authentication Handler
 * 
 * Validates Telegram Mini App initData using HMAC-SHA256,
 * then creates a Firebase custom token for the authenticated user.
 * 
 * Flow:
 * 1. Client sends initData from Telegram WebApp
 * 2. Backend validates HMAC signature using bot token
 * 3. Backend creates Firebase custom token with Telegram user ID as UID
 * 4. Client uses custom token to sign into Firebase
 * 
 * @see https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 */

import { createCustomToken } from '../utils/firebase-verify.js';
import { jsonResponse, errorResponse } from '../utils/response.js';

/**
 * Validate Telegram initData HMAC-SHA256 signature
 * 
 * Algorithm:
 * 1. Parse initData as URLSearchParams
 * 2. Remove 'hash' field, sort remaining fields alphabetically
 * 3. Create data_check_string (field=value joined by \n)
 * 4. secret_key = HMAC-SHA256("WebAppData", bot_token)
 * 5. Verify: HMAC-SHA256(secret_key, data_check_string) === hash
 * 
 * @param {string} initData - Raw initData query string from Telegram
 * @param {string} botToken - Telegram bot token
 * @returns {Promise<object|null>} Parsed user data if valid, null if invalid
 */
async function validateTelegramData(initData, botToken) {
  try {
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');

    if (!hash) return null;

    // Remove hash and sort remaining parameters
    params.delete('hash');
    const entries = [...params.entries()].sort(([a], [b]) => a.localeCompare(b));
    const dataCheckString = entries.map(([key, val]) => `${key}=${val}`).join('\n');

    // Create secret key: HMAC-SHA256("WebAppData", bot_token)
    const encoder = new TextEncoder();
    const secretKeyData = await crypto.subtle.importKey(
      'raw',
      encoder.encode('WebAppData'),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const secretKey = await crypto.subtle.sign(
      'HMAC',
      secretKeyData,
      encoder.encode(botToken)
    );

    // Calculate expected hash: HMAC-SHA256(secret_key, data_check_string)
    const signingKey = await crypto.subtle.importKey(
      'raw',
      secretKey,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const calculatedHash = await crypto.subtle.sign(
      'HMAC',
      signingKey,
      encoder.encode(dataCheckString)
    );

    // Convert to hex string for comparison
    const hashHex = Array.from(new Uint8Array(calculatedHash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    // Constant-time comparison
    if (hashHex.length !== hash.length) return null;
    let mismatch = 0;
    for (let i = 0; i < hashHex.length; i++) {
      mismatch |= hashHex.charCodeAt(i) ^ hash.charCodeAt(i);
    }

    if (mismatch !== 0) return null;

    // Parse user data from initData
    const userStr = params.get('user');
    if (!userStr) return null;

    return JSON.parse(userStr);
  } catch (error) {
    console.error('[Telegram] Validation error:', error);
    return null;
  }
}

/**
 * Handle POST /api/auth/telegram
 * 
 * Validates Telegram initData and returns a Firebase custom token
 * 
 * @param {Request} request - Incoming request with { initData, user } body
 * @param {object} env - Worker environment bindings
 * @returns {Promise<Response>}
 */
export async function handleTelegramAuth(request, env) {
  try {
    const body = await request.json();
    const { initData } = body;

    if (!initData) {
      return errorResponse('initData is required', 400, request);
    }

    const botToken = env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      console.error('[Telegram] TELEGRAM_BOT_TOKEN not configured');
      return errorResponse('Server configuration error', 500, request);
    }

    // Validate the initData signature
    const telegramUser = await validateTelegramData(initData, botToken);

    if (!telegramUser) {
      return errorResponse('Invalid Telegram authentication data', 401, request);
    }

    // Validate auth_date is not too old (max 5 minutes)
    const params = new URLSearchParams(initData);
    const authDate = parseInt(params.get('auth_date'), 10);
    const now = Math.floor(Date.now() / 1000);
    if (now - authDate > 300) {
      return errorResponse('Authentication data expired', 401, request);
    }

    // Create a unique Firebase UID for Telegram users
    const uid = `telegram_${telegramUser.id}`;

    // Additional claims to store in the token
    const claims = {
      telegramId: telegramUser.id,
      firstName: telegramUser.first_name || '',
      lastName: telegramUser.last_name || '',
      username: telegramUser.username || '',
      photoUrl: telegramUser.photo_url || '',
      provider: 'telegram',
    };

    // Create Firebase custom token
    const customToken = await createCustomToken(uid, claims, env);

    // Optionally store/update user in KV
    if (env.USERS_KV) {
      await env.USERS_KV.put(
        `user:${uid}:profile`,
        JSON.stringify({
          uid,
          telegramId: telegramUser.id,
          firstName: telegramUser.first_name,
          lastName: telegramUser.last_name,
          username: telegramUser.username,
          photoUrl: telegramUser.photo_url,
          lastLogin: new Date().toISOString(),
        })
      );
    }

    return jsonResponse(
      {
        success: true,
        customToken,
        user: {
          uid,
          displayName: `${telegramUser.first_name || ''} ${telegramUser.last_name || ''}`.trim(),
          telegramId: telegramUser.id,
        },
      },
      200,
      request
    );
  } catch (error) {
    console.error('[Telegram] Auth handler error:', error);
    return errorResponse('Internal server error', 500, request);
  }
}
