import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { isTelegramMiniApp, getTelegramUser } from '../auth/telegram'
import { Button, Ar } from './ui'

// Combined Login / Register screen with tabbed mode.
export default function AuthScreen() {
  const { login, register, loginGoogle, error, clearError, loading, isTelegram } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // If we're in Telegram, show a simplified "allow" screen
  if (isTelegram) {
    return <TelegramAuthScreen />
  }

  const switchMode = (m) => {
    setMode(m)
    clearError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (mode === 'register') {
        await register(email, password, name)
      } else {
        await login(email, password)
      }
    } catch (err) {
      // error is set in context
    }
    setSubmitting(false)
  }

  const handleGoogle = async () => {
    setSubmitting(true)
    try {
      await loginGoogle()
    } catch (err) {
      // error is set in context
    }
    setSubmitting(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-primary/10 to-white">
      <div className="flex flex-1 flex-col items-center justify-center px-5 py-8">
        {/* Logo */}
        <div className="mb-3 text-6xl">📖</div>
        <Ar size="text-4xl" className="mb-2 font-bold text-primary-dark">
          عَرَبِيّ
        </Ar>
        <h1 className="mb-6 text-2xl font-black text-ink">Arab Akademiya</h1>

        {/* Tab switcher */}
        <div className="mb-5 flex w-full max-w-xs overflow-hidden rounded-2xl border-2 border-line">
          <TabBtn active={mode === 'login'} onClick={() => switchMode('login')}>
            Kirish
          </TabBtn>
          <TabBtn active={mode === 'register'} onClick={() => switchMode('register')}>
            Ro'yxatdan o'tish
          </TabBtn>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-3">
          {mode === 'register' && (
            <Input
              placeholder="Ismingiz"
              value={name}
              onChange={setName}
              icon="👤"
            />
          )}
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={setEmail}
            icon="✉️"
          />
          <Input
            placeholder="Parol"
            type="password"
            value={password}
            onChange={setPassword}
            icon="🔒"
          />

          {error && (
            <div className="rounded-xl bg-danger/10 p-3 text-sm font-bold text-danger">
              ⚠️ {error}
            </div>
          )}

          <Button
            full
            size="lg"
            type="submit"
            disabled={submitting || !email || !password}
          >
            {submitting ? '...' : mode === 'register' ? "Ro'yxatdan o'tish" : 'Kirish'}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-4 flex w-full max-w-xs items-center gap-3">
          <div className="h-px flex-1 bg-line" />
          <span className="text-xs font-bold text-muted">yoki</span>
          <div className="h-px flex-1 bg-line" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={submitting}
          className="flex w-full max-w-xs items-center justify-center gap-3 rounded-2xl border-2 border-line bg-white px-4 py-3 font-bold text-ink transition active:scale-[0.98] disabled:opacity-50"
        >
          <GoogleIcon />
          Google bilan kirish
        </button>

        {/* Telegram hint */}
        <p className="mt-5 max-w-xs text-center text-xs text-muted">
          Telegram orqali kirish uchun ilovani{' '}
          <span className="font-bold text-info">@ArabAcademyBot</span> orqali oching
        </p>
      </div>
    </div>
  )
}

// ── Telegram Auth Screen ─────────────────────────────────
function TelegramAuthScreen() {
  const { loading } = useAuth()
  const tgUser = getTelegramUser()

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-info border-t-transparent" />
        <p className="font-bold text-muted">Telegram orqali kirilmoqda...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <div className="mb-4 text-7xl">✈️</div>
      <h1 className="mb-2 text-2xl font-black text-ink">Telegram orqali kirish</h1>
      {tgUser && (
        <div className="mb-4 flex items-center gap-3 rounded-2xl border-2 border-line bg-surface p-4">
          {tgUser.photo_url ? (
            <img src={tgUser.photo_url} className="h-12 w-12 rounded-full" alt="" />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-info text-xl text-white">
              {tgUser.first_name?.[0] || '?'}
            </div>
          )}
          <div className="text-left">
            <p className="font-black text-ink">
              {tgUser.first_name} {tgUser.last_name || ''}
            </p>
            {tgUser.username && <p className="text-sm text-muted">@{tgUser.username}</p>}
          </div>
        </div>
      )}
      <p className="mb-6 max-w-xs text-muted">
        Siz Telegram Mini App orqali avtomatik tizimga kirdingiz. O'rganishni boshlashingiz mumkin!
      </p>
      <div className="animate-pulse text-sm font-bold text-primary">
        ✓ Muvaffaqiyatli ulandi
      </div>
    </div>
  )
}

// ── Helper Components ────────────────────────────────────
function TabBtn({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 py-3 text-sm font-extrabold transition ${
        active ? 'bg-primary text-white' : 'bg-white text-muted'
      }`}
    >
      {children}
    </button>
  )
}

function Input({ placeholder, type = 'text', value, onChange, icon }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border-2 border-line bg-white px-4 py-3 focus-within:border-primary">
      <span className="text-lg">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent font-bold text-ink outline-none placeholder:text-muted"
      />
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}
