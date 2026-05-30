// Telegram initData validation and Firebase custom token generation.
// Reference: https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app

import { jsonResponse, errorResponse, corsHeaders } from '../utils/response.js'
import { createFirebaseCustomToken } from '../utils/firebase-verify.js'

export async function handleTelegramAuth(request, env) {
  const body = await request.json()
  const { initData } = body

  if (!initData) {
    return errorResponse('Missing initData', 400)
  }

  // Validate Telegram initData
  const validated = await validateTelegramData(initData, env.TELEGRAM_BOT_TOKEN)
  if (!validated) {
    return errorResponse('Invalid Telegram data', 401)
  }

  // Extract user from initData
  const params = new URLSearchParams(initData)
  const userJson = params.get('user')
  if (!userJson) {
    return errorResponse('No user in initData', 400)
  }

  const tgUser = JSON.parse(userJson)
  const uid = `tg_${tgUser.id}`

  // Store/update user profile in KV
  const profile = {
    uid,
    telegramId: tgUser.id,
    firstName: tgUser.first_name,
    lastName: tgUser.last_name || '',
    username: tgUser.username || '',
    photoUrl: tgUser.photo_url || '',
    lastLogin: new Date().toISOString(),
  }
  await env.USERS_KV.put(`profile:${uid}`, JSON.stringify(profile))

  // Create a Firebase custom token for this Telegram user
  // NOTE: In production, you'd use the Firebase Admin SDK via a service account.
  // For Cloudflare Workers, we generate a JWT that Firebase accepts.
  const customToken = await createFirebaseCustomToken(uid, env)

  return jsonResponse({ customToken, uid, profile }, corsHeaders())
}

// ── Telegram Data Validation ────────────────────────────
// Uses HMAC-SHA256 as per Telegram docs.
async function validateTelegramData(initData, botToken) {
  if (!botToken) {
    console.warn('TELEGRAM_BOT_TOKEN not set — skipping validation in dev')
    return true // allow in dev
  }

  try {
    const params = new URLSearchParams(initData)
    const hash = params.get('hash')
    if (!hash) return false

    // Build data-check-string (sorted key=value pairs, excluding hash)
    params.delete('hash')
    const entries = [...params.entries()]
    entries.sort((a, b) => a[0].localeCompare(b[0]))
    const dataCheckString = entries.map(([k, v]) => `${k}=${v}`).join('\n')

    // Secret key = HMAC_SHA256("WebAppData", botToken)
    const encoder = new TextEncoder()
    const secretKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode('WebAppData'),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    const secretHash = await crypto.subtle.sign('HMAC', secretKey, encoder.encode(botToken))

    // Data hash = HMAC_SHA256(secretHash, dataCheckString)
    const dataKey = await crypto.subtle.importKey(
      'raw',
      secretHash,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    const signature = await crypto.subtle.sign('HMAC', dataKey, encoder.encode(dataCheckString))

    // Compare
    const signatureHex = [...new Uint8Array(signature)]
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')

    return signatureHex === hash
  } catch (e) {
    console.error('Telegram validation error:', e)
    return false
  }
}
