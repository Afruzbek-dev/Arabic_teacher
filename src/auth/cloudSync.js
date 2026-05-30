// Cloud sync utilities — syncs user progress to Cloudflare Workers KV backend.
// The backend URL is set via VITE_BACKEND_URL environment variable.

import { getIdToken } from './firebase'

const BACKEND_URL = () => import.meta.env.VITE_BACKEND_URL || ''

// ── Sync user progress TO cloud ─────────────────────────
export async function syncUserToCloud(uid, progressData) {
  const url = BACKEND_URL()
  if (!url) return null // no backend configured
  try {
    const token = await getIdToken()
    const res = await fetch(`${url}/api/user/${uid}/progress`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(progressData),
    })
    if (!res.ok) throw new Error(`Sync failed: ${res.status}`)
    return await res.json()
  } catch (e) {
    console.warn('Cloud sync failed (offline?):', e.message)
    return null
  }
}

// ── Fetch user progress FROM cloud ──────────────────────
export async function fetchUserFromCloud(uid) {
  const url = BACKEND_URL()
  if (!url) return null
  try {
    const token = await getIdToken()
    const res = await fetch(`${url}/api/user/${uid}/progress`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) return null
    return await res.json()
  } catch (e) {
    console.warn('Cloud fetch failed (offline?):', e.message)
    return null
  }
}

// ── Delete user data from cloud ─────────────────────────
export async function deleteUserFromCloud(uid) {
  const url = BACKEND_URL()
  if (!url) return
  try {
    const token = await getIdToken()
    await fetch(`${url}/api/user/${uid}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (e) {
    // ignore
  }
}
