// Cloudflare Workers API for Arab Academy
// Handles: Telegram auth validation, user progress CRUD, Firebase token verification.
//
// Environment bindings:
//   USERS_KV          — KV namespace for user data
//   FIREBASE_PROJECT_ID — Firebase project ID (for token verification)
//   TELEGRAM_BOT_TOKEN  — Telegram bot token (for initData validation)

import { handleTelegramAuth } from './handlers/telegram.js'
import { handleUserProgress } from './handlers/progress.js'
import { verifyFirebaseToken } from './utils/firebase-verify.js'
import { corsHeaders, jsonResponse, errorResponse } from './utils/response.js'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const method = request.method

    // CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() })
    }

    try {
      // ── Routes ──────────────────────────────────────
      const path = url.pathname

      // POST /api/auth/telegram — Validate Telegram initData, return Firebase custom token
      if (path === '/api/auth/telegram' && method === 'POST') {
        return await handleTelegramAuth(request, env)
      }

      // GET/PUT /api/user/:uid/progress — User progress CRUD
      if (path.match(/^\/api\/user\/[^/]+\/progress$/) && (method === 'GET' || method === 'PUT')) {
        const uid = path.split('/')[3]
        // Verify Firebase token for non-Telegram requests
        const authHeader = request.headers.get('Authorization')
        if (!authHeader?.startsWith('Bearer ')) {
          return errorResponse('Unauthorized', 401)
        }
        const token = authHeader.slice(7)
        const verified = await verifyFirebaseToken(token, env.FIREBASE_PROJECT_ID)
        if (!verified || verified.uid !== uid) {
          return errorResponse('Forbidden', 403)
        }
        return await handleUserProgress(request, env, uid, method)
      }

      // DELETE /api/user/:uid — Delete user data
      if (path.match(/^\/api\/user\/[^/]+$/) && method === 'DELETE') {
        const uid = path.split('/')[3]
        const authHeader = request.headers.get('Authorization')
        if (!authHeader?.startsWith('Bearer ')) {
          return errorResponse('Unauthorized', 401)
        }
        const token = authHeader.slice(7)
        const verified = await verifyFirebaseToken(token, env.FIREBASE_PROJECT_ID)
        if (!verified || verified.uid !== uid) {
          return errorResponse('Forbidden', 403)
        }
        await env.USERS_KV.delete(`user:${uid}`)
        return jsonResponse({ success: true })
      }

      // GET /api/health — Health check
      if (path === '/api/health') {
        return jsonResponse({ status: 'ok', ts: Date.now() })
      }

      return errorResponse('Not Found', 404)
    } catch (e) {
      console.error('Worker error:', e)
      return errorResponse('Internal Server Error', 500)
    }
  },
}
