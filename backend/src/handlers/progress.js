/**
 * User Progress Handlers
 * 
 * CRUD operations for user progress data stored in Cloudflare KV.
 * All endpoints require Firebase ID token authentication.
 * 
 * KV Key Format: user:{uid}:progress
 * 
 * Stored data includes: lessons completed, XP, streak, vocabulary, etc.
 */

import { verifyFirebaseToken } from '../utils/firebase-verify.js';
import { jsonResponse, errorResponse } from '../utils/response.js';

/**
 * Verify the Authorization header and extract user info
 * @param {Request} request - Incoming request
 * @param {object} env - Worker environment
 * @returns {Promise<object>} Decoded token payload
 * @throws {Error} If token is missing or invalid
 */
async function authenticateRequest(request, env) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Authorization header missing or invalid');
  }

  const token = authHeader.slice(7); // Remove 'Bearer ' prefix
  const projectId = env.FIREBASE_PROJECT_ID;

  if (!projectId) {
    throw new Error('FIREBASE_PROJECT_ID not configured');
  }

  return verifyFirebaseToken(token, projectId);
}

/**
 * GET /api/user/:uid/progress
 * 
 * Retrieve user progress data from KV
 * @param {Request} request - Incoming request
 * @param {object} env - Worker environment bindings
 * @param {string} uid - User UID from URL params
 * @returns {Promise<Response>}
 */
export async function getProgress(request, env, uid) {
  try {
    // Authenticate the request
    const decoded = await authenticateRequest(request, env);

    // Ensure user can only access their own data
    if (decoded.sub !== uid && decoded.uid !== uid) {
      return errorResponse('Forbidden: cannot access other user data', 403, request);
    }

    // Fetch from KV
    const data = await env.USERS_KV.get(`user:${uid}:progress`, { type: 'json' });

    if (!data) {
      return errorResponse('User progress not found', 404, request);
    }

    return jsonResponse(
      {
        success: true,
        data,
      },
      200,
      request
    );
  } catch (error) {
    if (error.message.includes('Authorization') || error.message.includes('Token')) {
      return errorResponse('Unauthorized: ' + error.message, 401, request);
    }
    console.error('[Progress] GET error:', error);
    return errorResponse('Internal server error', 500, request);
  }
}

/**
 * PUT /api/user/:uid/progress
 * 
 * Create or update user progress data in KV
 * @param {Request} request - Incoming request with progress data body
 * @param {object} env - Worker environment bindings
 * @param {string} uid - User UID from URL params
 * @returns {Promise<Response>}
 */
export async function putProgress(request, env, uid) {
  try {
    // Authenticate the request
    const decoded = await authenticateRequest(request, env);

    // Ensure user can only modify their own data
    if (decoded.sub !== uid && decoded.uid !== uid) {
      return errorResponse('Forbidden: cannot modify other user data', 403, request);
    }

    // Parse request body
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return errorResponse('Invalid request body', 400, request);
    }

    // Prepare data with metadata
    const progressData = {
      ...body,
      uid,
      updatedAt: new Date().toISOString(),
    };

    // Store in KV (with 90-day expiration for inactive users)
    await env.USERS_KV.put(
      `user:${uid}:progress`,
      JSON.stringify(progressData),
      { expirationTtl: 90 * 24 * 60 * 60 } // 90 days
    );

    return jsonResponse(
      {
        success: true,
        message: 'Progress saved successfully',
        data: progressData,
      },
      200,
      request
    );
  } catch (error) {
    if (error.message.includes('Authorization') || error.message.includes('Token')) {
      return errorResponse('Unauthorized: ' + error.message, 401, request);
    }
    console.error('[Progress] PUT error:', error);
    return errorResponse('Internal server error', 500, request);
  }
}

/**
 * DELETE /api/user/:uid
 * 
 * Delete all user data from KV (progress + profile)
 * @param {Request} request - Incoming request
 * @param {object} env - Worker environment bindings
 * @param {string} uid - User UID from URL params
 * @returns {Promise<Response>}
 */
export async function deleteUser(request, env, uid) {
  try {
    // Authenticate the request
    const decoded = await authenticateRequest(request, env);

    // Ensure user can only delete their own data
    if (decoded.sub !== uid && decoded.uid !== uid) {
      return errorResponse('Forbidden: cannot delete other user data', 403, request);
    }

    // Delete progress data
    await env.USERS_KV.delete(`user:${uid}:progress`);

    // Delete profile data (if exists)
    await env.USERS_KV.delete(`user:${uid}:profile`);

    return jsonResponse(
      {
        success: true,
        message: 'User data deleted successfully',
      },
      200,
      request
    );
  } catch (error) {
    if (error.message.includes('Authorization') || error.message.includes('Token')) {
      return errorResponse('Unauthorized: ' + error.message, 401, request);
    }
    console.error('[Progress] DELETE error:', error);
    return errorResponse('Internal server error', 500, request);
  }
}
