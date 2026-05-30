import React from 'react'

// ── Arabic text ──────────────────────────────────────────
export function Ar({ children, className = '', size = 'text-3xl' }) {
  return (
    <span dir="rtl" className={`font-arabic ${size} leading-relaxed ${className}`}>
      {children}
    </span>
  )
}

// ── 3D button (Duolingo style) ──────────────────────────
const VARIANTS = {
  primary: 'bg-primary text-white',
  danger: 'bg-danger text-white',
  accent: 'bg-accent text-white',
  info: 'bg-info text-white',
  purple: 'bg-purple text-white',
  gold: 'bg-gold text-ink',
  ghost: 'bg-white text-ink border-2 border-line shadow-none',
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  full = false,
  size = 'md',
  type = 'button',
}) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-7 py-4 text-lg',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn-3d ${VARIANTS[variant]} ${sizes[size]} ${full ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  )
}

// ── Progress bar ────────────────────────────────────────
export function ProgressBar({ value, max = 100, color = 'bg-primary', className = '', height = 'h-3' }) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0
  return (
    <div className={`w-full ${height} rounded-full bg-line overflow-hidden ${className}`}>
      <div
        className={`h-full ${color} rounded-full transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

// ── Stars ───────────────────────────────────────────────
export function Stars({ count = 0, size = 'text-2xl' }) {
  return (
    <div className={`flex gap-1 ${size}`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={i < count ? 'opacity-100' : 'opacity-25 grayscale'}>
          ⭐
        </span>
      ))}
    </div>
  )
}

// ── Circular gauge (accuracy) ───────────────────────────
export function Gauge({ value = 0, label = '', color = '#58CC02', size = 120 }) {
  const r = (size - 14) / 2
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#E5E5E5" strokeWidth="10" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-black">{value}%</span>
        {label && <span className="text-xs text-muted">{label}</span>}
      </div>
    </div>
  )
}

// ── Pill / badge ────────────────────────────────────────
export function Pill({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold ${className}`}>
      {children}
    </span>
  )
}

// ── Confetti overlay ────────────────────────────────────
export function Confetti({ pieces = 60 }) {
  const colors = ['#58CC02', '#FF9600', '#1CB0F6', '#CE82FF', '#FFC800', '#FF4B4B']
  const items = Array.from({ length: pieces }).map((_, i) => {
    const left = Math.random() * 100
    const delay = Math.random() * 0.6
    const dur = 1.8 + Math.random() * 1.5
    const color = colors[i % colors.length]
    const rounded = Math.random() > 0.5
    return (
      <span
        key={i}
        className="confetti-piece"
        style={{
          left: `${left}%`,
          background: color,
          animationDelay: `${delay}s`,
          animationDuration: `${dur}s`,
          borderRadius: rounded ? '50%' : '2px',
        }}
      />
    )
  })
  return <div className="pointer-events-none absolute inset-0 overflow-hidden z-50">{items}</div>
}

// ── Modal sheet (bottom) ────────────────────────────────
export function Sheet({ open, onClose, children, color = 'bg-white' }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 animate-fadeIn" />
      <div
        className={`relative mx-auto w-full max-w-[480px] ${color} rounded-t-3xl p-5 pb-8 animate-slideUp`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-line" />
        {children}
      </div>
    </div>
  )
}

// ── Centered icon circle ────────────────────────────────
export function IconCircle({ children, color = 'bg-primary', size = 'w-16 h-16', className = '' }) {
  return (
    <div className={`${size} ${color} ${className} rounded-full flex items-center justify-center text-2xl shadow-card`}>
      {children}
    </div>
  )
}
