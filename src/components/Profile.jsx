import React from 'react'
import { useStore } from '../store/AppStore'
import { useNav } from '../store/nav'
import TopBar from './TopBar'
import BadgeSystem from './BadgeSystem'
import { Button, ProgressBar } from './ui'
import { todayStr } from '../utils/progress'
import { LEVEL_META } from '../data/curriculum'

export default function Profile() {
  const { state } = useStore()
  const { navigate } = useNav()
  const { user, stats, vocabulary, progress } = state

  // Last 7 days XP
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000)
    const key = todayStr(d)
    days.push({ key, label: ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh'][d.getDay()], xp: stats.xpHistory[key] || 0 })
  }
  const maxXp = Math.max(50, ...days.map((d) => d.xp))

  const meta = LEVEL_META[user.level]

  return (
    <div className="pb-8">
      <TopBar title="Profil" />
      <div className="space-y-4 p-4">
        {/* Identity */}
        <div className="card flex items-center gap-4 p-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-4xl text-white shadow-card">
            {user.name?.[0]?.toUpperCase() || '🙂'}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-ink">{user.name}</h1>
            <span
              className="mt-1 inline-block rounded-full px-3 py-0.5 text-sm font-bold text-white"
              style={{ background: meta.color }}
            >
              {user.level} · {meta.title}
            </span>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-3">
          <StatTile icon="⚡" value={user.xpTotal} label="Jami XP" color="text-accent" />
          <StatTile icon="🔥" value={`${user.streakDays} kun`} label="Streak" color="text-accent" />
          <StatTile icon="✅" value={stats.lessonsDone} label="Tugatilgan darslar" color="text-primary" />
          <StatTile icon="📚" value={vocabulary.knownWords.length} label="O'rganilgan so'zlar" color="text-info" />
          <StatTile icon="💎" value={user.gems} label="Gavharlar" color="text-info" />
          <StatTile icon="👑" value={progress.masteredLessons.length} label="Mukammal darslar" color="text-gold" />
        </div>

        {/* 7-day XP chart */}
        <div className="card p-4">
          <h3 className="mb-3 font-extrabold text-ink">So'nggi 7 kun</h3>
          <div className="flex items-end justify-between gap-2" style={{ height: 120 }}>
            {days.map((d) => (
              <div key={d.key} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-muted">{d.xp || ''}</span>
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-lg bg-accent transition-all"
                    style={{ height: `${Math.max(4, (d.xp / maxXp) * 90)}px`, opacity: d.xp ? 1 : 0.25 }}
                  />
                </div>
                <span className="text-[10px] font-bold text-muted">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Level progress */}
        <div className="card p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-extrabold text-ink">Daraja darajasi</h3>
            <span className="text-sm font-bold text-muted">{user.xpTotal % 100}/100</span>
          </div>
          <ProgressBar value={user.xpTotal % 100} max={100} color="bg-primary" />
          <p className="mt-2 text-xs text-muted">Har 100 XP — yangi bosqich 🚀</p>
        </div>

        {/* Badges */}
        <div className="card p-4">
          <h3 className="mb-3 font-extrabold text-ink">Yutuqlar</h3>
          <BadgeSystem earnedIds={user.badges} />
        </div>

        <Button full variant="ghost" onClick={() => navigate('settings')}>
          ⚙️ Sozlamalar
        </Button>
      </div>
    </div>
  )
}

function StatTile({ icon, value, label, color }) {
  return (
    <div className="card flex items-center gap-3 p-4">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className={`text-xl font-black ${color}`}>{value}</p>
        <p className="text-[11px] text-muted">{label}</p>
      </div>
    </div>
  )
}
