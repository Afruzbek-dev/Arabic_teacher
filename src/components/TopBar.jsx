import React from 'react'
import { useStore } from '../store/AppStore'
import StreakCounter from './StreakCounter'
import Hearts from './Hearts'

// Sticky header showing level, streak, gems, hearts.
export default function TopBar({ title }) {
  const { state } = useStore()
  const { user } = state
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b-2 border-line bg-white/95 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-2">
        <div className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-primary px-2 font-black text-white">
          {user.level}
        </div>
        {title && <span className="font-extrabold text-ink">{title}</span>}
      </div>
      <div className="flex items-center gap-3">
        <StreakCounter days={user.streakDays} compact />
        <div className="flex items-center gap-1 font-black text-info">
          <span>💎</span>
          <span>{user.gems}</span>
        </div>
        <Hearts value={user.hearts} size="text-base" />
      </div>
    </header>
  )
}
