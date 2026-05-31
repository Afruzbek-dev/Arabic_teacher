/**
 * Authentication Context — Supabase Auth
 *
 * Supports:
 * - Email/password registration & login
 * - Google OAuth sign-in
 * - Telegram Mini App auto-login (via Supabase custom JWT or anonymous user)
 * - Session persistence (auto-refresh)
 * - User progress sync to Supabase DB
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase'
import { isTelegramMiniApp, getTelegramUser, telegramReady } from './telegram'

const AuthContext = createContext(null)

// Firebase error codes → Uzbek (reused for Supabase errors too)
const ERROR_MESSAGES = {
  'Invalid login credentials': 'Email yoki parol noto\'g\'ri',
  'User already registered': 'Bu email allaqachon ro\'yxatdan o\'tgan',
  'Email not confirmed': 'Emailingizni tasdiqlang (pochtani tekshiring)',
  'Password should be at least 6 characters': 'Parol kamida 6 ta belgi bo\'lishi kerak',
  'Unable to validate email address: invalid format': 'Email formati noto\'g\'ri',
  'Email rate limit exceeded': 'Juda ko\'p urinish. Biroz kuting',
  'Signups not allowed for this instance': 'Ro\'yxatdan o\'tish vaqtinchalik yopiq',
  default: 'Xatolik yuz berdi. Qayta urinib ko\'ring',
}

function getErrorMessage(msg) {
  if (!msg) return ERROR_MESSAGES.default
  for (const [key, val] of Object.entries(ERROR_MESSAGES)) {
    if (key !== 'default' && msg.includes(key)) return val
  }
  return ERROR_MESSAGES.default
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isTelegram] = useState(() => isTelegramMiniApp())

  // Clear error after 5s
  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(null), 5000)
      return () => clearTimeout(t)
    }
  }, [error])

  // Listen to Supabase auth state
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user || null)
      setLoading(false)
    })

    // Subscribe to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setUser(s?.user || null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Telegram auto-login
  useEffect(() => {
    if (!isTelegram) return
    telegramReady()
    const tgUser = getTelegramUser()
    if (!tgUser) {
      setLoading(false)
      return
    }

    // If already logged in, skip
    if (user) {
      setLoading(false)
      return
    }

    // For Telegram: sign in anonymously or with a magic email
    // Supabase doesn't have native Telegram OAuth, so we use a deterministic
    // email/password based on the Telegram user ID.
    const tgEmail = `tg_${tgUser.id}@arab-academy.app`
    const tgPassword = `tg_auth_${tgUser.id}_secure_token`

    ;(async () => {
      try {
        // Try to sign in first
        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email: tgEmail,
          password: tgPassword,
        })

        if (signInErr) {
          // If user doesn't exist, register them
          const { error: signUpErr } = await supabase.auth.signUp({
            email: tgEmail,
            password: tgPassword,
            options: {
              data: {
                display_name: `${tgUser.first_name || ''} ${tgUser.last_name || ''}`.trim(),
                telegram_id: tgUser.id,
                telegram_username: tgUser.username || '',
                avatar_url: tgUser.photo_url || '',
                provider: 'telegram',
              },
            },
          })
          if (signUpErr) throw signUpErr
        }
      } catch (e) {
        console.error('[Auth] Telegram auto-login failed:', e)
        setError('Telegram orqali kirish muvaffaqiyatsiz')
      }
      setLoading(false)
    })()
  }, [isTelegram, user])

  // ── Actions ──────────────────────────────────────────

  const register = useCallback(async (email, password, displayName) => {
    setError(null)
    setLoading(true)
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName || '', provider: 'email' },
      },
    })
    if (err) {
      setError(getErrorMessage(err.message))
      setLoading(false)
      throw err
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    setError(null)
    setLoading(true)
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) {
      setError(getErrorMessage(err.message))
      setLoading(false)
      throw err
    }
    setLoading(false)
  }, [])

  const loginGoogle = useCallback(async () => {
    setError(null)
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })
    if (err) {
      setError(getErrorMessage(err.message))
      throw err
    }
  }, [])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
  }, [])

  const clearError = useCallback(() => setError(null), [])

  const value = {
    user,
    session,
    loading,
    error,
    isTelegram,
    isAuthenticated: !!user,
    displayName: user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Talaba',
    avatarUrl: user?.user_metadata?.avatar_url || null,
    register,
    login,
    loginGoogle,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
