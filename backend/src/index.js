/**
 * Arabic Academy API — Cloudflare Worker
 * 
 * Main router for the backend API.
 * Handles CORS preflight, routes requests to appropriate handlers.
 * 
 * Routes:
 *   POST   /api/auth/telegram          → Telegram Mini App authentication
 *   GET    /api/user/:uid/progress     → Get user progress
 *   PUT    /api/user/:uid/progress     → Save/update user progress
 *   DELETE /api/user/:uid              → Delete all user data
 *   GET    /api/health                 → Health check endpoint
 * 
 * All routes support CORS for cross-origin frontend requests.
 */

import { handleTelegramAuth } from './handlers/telegram.js';
import { getProgress, putProgress, deleteUser } from './handlers/progress.js';
import { corsHeaders, jsonResponse, errorResponse } from './utils/response.js';

/**
 * Main fetch handler for the Cloudflare Worker
 * Routes incoming requests to the appropriate handler
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;

    // --- CORS Preflight ---
    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request),
      });
    }

    try {
      // --- Route: Health Check ---
      if (pathname === '/api/health' && method === 'GET') {
        return jsonResponse(
          {
            success: true,
            status: 'healthy',
            timestamp: new Date().toISOString(),
            environment: env.ENVIRONMENT || 'unknown',
          },
          200,
          request
        );
      }

      // --- Route: Telegram Authentication ---
      if (pathname === '/api/auth/telegram' && method === 'POST') {
        return handleTelegramAuth(request, env);
      }

      // --- Route: User Progress (GET/PUT) ---
      const progressMatch = pathname.match(/^\/api\/user\/([^/]+)\/progress$/);
      if (progressMatch) {
        const uid = decodeURIComponent(progressMatch[1]);

        if (method === 'GET') {
          return getProgress(request, env, uid);
        }
        if (method === 'PUT') {
          return putProgress(request, env, uid);
        }

        return errorResponse('Method not allowed', 405, request);
      }

      // --- Route: Delete User ---
      const deleteMatch = pathname.match(/^\/api\/user\/([^/]+)$/);
      if (deleteMatch && method === 'DELETE') {
        const uid = decodeURIComponent(deleteMatch[1]);
        return deleteUser(request, env, uid);
      }

      // --- 404: Route Not Found ---
      return errorResponse(
        `Not found: ${method} ${pathname}`,
        404,
        request
      );
    } catch (error) {
      // Global error handler
      console.error('[Worker] Unhandled error:', error);
      return errorResponse('Internal server error', 500, request);
    }
  },
};
