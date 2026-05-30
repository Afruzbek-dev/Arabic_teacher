// Authentication context — wraps the entire app.
// Handles: Firebase auth state, Telegram auto-login, user profile sync.

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  auth,
  onAuthChange,
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  loginWithCustomToken,
  logout as firebaseLogout,
  getIdToken,
} from './firebase'
import {
  isTelegramMiniApp,
  getTelegramUser,
  getTelegramInitData,
  telegramReady,
} from './telegram'
import { syncUserToCloud, fetchUserFromCloud } from './cloudSync'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // Firebase user object
  const [profile, setProfile] = useState(null) // { displayName, photoURL, telegramId, ... }
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Listen to Firebase auth state
  useEffect(() => {
    const unsub = onAuthChange(async (fbUser) => {
      if (fbUser) {
        setUser(fbUser)
        setProfile({
          uid: fbUser.uid,
          displayName: fbUser.displayName || 'Talaba',
          email: fbUser.email,
          photoURL: fbUser.photoURL,
          provider: fbUser.providerData?.[0]?.providerId || 'custom',
        })
        // Try to sync/fetch cloud data
        try {
          await fetchUserFromCloud(fbUser.uid)
        } catch (e) {
          // offline is fine
        }
      } else {
        setUser(null)
        setProfile(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  // Auto-login from Telegram if running as mini app
  useEffect(() => {
    if (!isTelegramMiniApp()) return
    telegramReady()
    const tgUser = getTelegramUser()
    const initData = getTelegramInitData()
    if (!tgUser || !initData) return

    // Call our backend to validate initData and get a Firebase custom token
    ;(async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || ''
        if (!backendUrl) {
          // No backend configured — create a mock profile for dev
          console.warn('No VITE_BACKEND_URL set — Telegram auth in dev mode')
          setProfile({
            uid: `tg_${tgUser.id}`,
            displayName: tgUser.first_name + (tgUser.last_name ? ` ${tgUser.last_name}` : ''),
            photoURL: tgUser.photo_url || null,
            telegramId: tgUser.id,
            provider: 'telegram',
          })
          setLoading(false)
          return
        }
        const res = await fetch(`${backendUrl}/api/auth/telegram`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ initData }),
        })
        if (!res.ok) throw new Error('Telegram auth failed')
        const { customToken } = await res.json()
        await loginWithCustomToken(customToken)
      } catch (e) {
        console.error('Telegram auth error:', e)
        // Still allow usage with limited profile
        setProfile({
          uid: `tg_${tgUser.id}`,
          displayName: tgUser.first_name || 'Telegram User',
          telegramId: tgUser.id,
          provider: 'telegram',
        })
        setLoading(false)
      }
    })()
  }, [])

  // ── Actions ──────────────────────────────────────────
  const actions = {
    async register(email, password, name) {
      setError(null)
      try {
        await registerWithEmail(email, password, name)
      } catch (e) {
        setError(mapAuthError(e.code))
        throw e
      }
    },
    async login(email, password) {
      setError(null)
      try {
        await loginWithEmail(email, password)
      } catch (e) {
        setError(mapAuthError(e.code))
        throw e
      }
    },
    async loginGoogle() {
      setError(null)
      try {
        await loginWithGoogle()
      } catch (e) {
        setError(mapAuthError(e.code))
        throw e
      }
    },
    async logout() {
      await firebaseLogout()
      setUser(null)
      setProfile(null)
    },
    clearError() {
      setError(null)
    },
  }

  const value = {
    user,
    profile,
    loading,
    error,
    isAuthenticated: !!user || !!profile,
    isTelegram: isTelegramMiniApp(),
    ...actions,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}

// ── Error mapping ──────────────────────────────────────
function mapAuthError(code) {
  const map = {
    'auth/email-already-in-use': 'Bu email allaqachon ro\'yxatdan o\'tgan',
    'auth/invalid-email': 'Noto\'g\'ri email formati',
    'auth/weak-password': 'Parol kamida 6 ta belgi bo\'lishi kerak',
    'auth/user-not-found': 'Foydalanuvchi topilmadi',
    'auth/wrong-password': 'Noto\'g\'ri parol',
    'auth/too-many-requests': 'Juda ko\'p urinish. Keyinroq qayta urinib ko\'ring',
    'auth/popup-closed-by-user': 'Kirish bekor qilindi',
    'auth/network-request-failed': 'Internet aloqasi yo\'q',
  }
  return map[code] || 'Xatolik yuz berdi. Qayta urinib ko\'ring.'
}
