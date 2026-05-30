// User progress CRUD handler.
// Stores/retrieves full app state (progress, vocab, stats) from KV.

import { jsonResponse, errorResponse, corsHeaders } from '../utils/response.js'

export async function handleUserProgress(request, env, uid, method) {
  const kvKey = `user:${uid}`

  if (method === 'GET') {
    const data = await env.USERS_KV.get(kvKey, 'json')
    if (!data) {
      return jsonResponse({ exists: false }, corsHeaders())
    }
    return jsonResponse({ exists: true, data }, corsHeaders())
  }

  if (method === 'PUT') {
    const body = await request.json()
    if (!body) {
      return errorResponse('Empty body', 400)
    }

    // Merge with existing data (last-write-wins for each top-level key)
    const existing = (await env.USERS_KV.get(kvKey, 'json')) || {}
    const merged = {
      ...existing,
      ...body,
      _updatedAt: new Date().toISOString(),
      _uid: uid,
    }

    // KV max value size is 25MB — app state is well within this
    await env.USERS_KV.put(kvKey, JSON.stringify(merged), {
      // Expire after 365 days of inactivity (optional)
      expirationTtl: 365 * 24 * 60 * 60,
    })

    return jsonResponse({ success: true, updatedAt: merged._updatedAt }, corsHeaders())
  }

  return errorResponse('Method not allowed', 405)
}
