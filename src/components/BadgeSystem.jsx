import React from 'react'
import { BADGES } from '../data/badges'

// Grid of all badges, showing earned vs locked.
export default function BadgeSystem({ earnedIds = [] }) {
  const earned = new Set(earnedIds)
  return (
    <div className="grid grid-cols-3 gap-3">
      {BADGES.map((b) => {
        const got = earned.has(b.id)
        return (
          <div
            key={b.id}
            className={`card flex flex-col items-center gap-1 p-3 text-center transition ${
              got ? 'border-gold bg-gold/10' : 'opacity-60'
            }`}
            title={b.desc}
          >
            <span className={`text-3xl ${got ? '' : 'grayscale'}`}>{b.icon}</span>
            <span className="text-[11px] font-bold leading-tight text-ink">{b.title}</span>
            {!got && <span className="text-[9px] text-muted leading-tight">{b.desc}</span>}
          </div>
        )
      })}
    </div>
  )
}

// Toast shown when new badges are earned.
export function BadgeToast({ badgeIds = [], onClose }) {
  if (!badgeIds.length) return null
  const badges = badgeIds.map((id) => BADGES.find((b) => b.id === id)).filter(Boolean)
  return (
    <div className="fixed inset-x-0 top-4 z-[60] flex justify-center px-4">
      <div className="mx-auto w-full max-w-[440px] animate-slideUp rounded-2xl bg-gold p-4 shadow-card" onClick={onClose}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{badges[0].icon}</span>
          <div>
            <p className="font-black text-ink">Yangi yutuq! 🎉</p>
            <p className="text-sm font-bold text-ink/80">
              {badges.map((b) => b.title).join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
