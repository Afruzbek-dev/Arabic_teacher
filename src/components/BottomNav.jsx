import React from 'react'
import { useNav } from '../store/nav'
import { useStore } from '../store/AppStore'
import { dueCount } from '../utils/srs'

const TABS = [
  { view: 'dashboard', icon: '🏠', label: 'Bosh' },
  { view: 'map', icon: '🗺️', label: 'Yo\'l' },
  { view: 'review', icon: '🃏', label: 'Takror' },
  { view: 'profile', icon: '👤', label: 'Profil' },
]

export default function BottomNav() {
  const { view, navigate } = useNav()
  const { state } = useStore()
  const due = dueCount(state.vocabulary.srsQueue)

  return (
    <nav className="sticky bottom-0 z-30 grid grid-cols-4 border-t-2 border-line bg-white">
      {TABS.map((t) => {
        const active = view === t.view
        return (
          <button
            key={t.view}
            onClick={() => navigate(t.view)}
            className={`relative flex flex-col items-center gap-0.5 py-2.5 text-xs font-bold transition ${
              active ? 'text-primary' : 'text-muted'
            }`}
          >
            <span className={`text-2xl ${active ? 'scale-110' : ''} transition`}>{t.icon}</span>
            {t.label}
            {t.view === 'review' && due > 0 && (
              <span className="absolute right-1/4 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-black text-white">
                {due}
              </span>
            )}
          </button>
        )
      })}
    </nav>
  )
}
