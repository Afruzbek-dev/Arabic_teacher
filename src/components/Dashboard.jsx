import React from 'react'
import { useStore, useResumeLesson } from '../store/AppStore'
import { useNav } from '../store/nav'
import TopBar from './TopBar'
import XPBar from './XPBar'
import StreakCounter from './StreakCounter'
import { Button } from './ui'
import { dueCount } from '../utils/srs'

const SKILLS = [
  { key: 'reading', label: "O'qish", icon: '📖', color: '#58CC02' },
  { key: 'writing', label: 'Yozish', icon: '✍️', color: '#CE82FF' },
  { key: 'listening', label: 'Tinglash', icon: '🎧', color: '#1CB0F6' },
  { key: 'speaking', label: 'Gapirish', icon: '🗣️', color: '#FF9600' },
]

export default function Dashboard() {
  const { state } = useStore()
  const { navigate } = useNav()
  const resume = useResumeLesson()
  const { user, stats, vocabulary } = state
  const due = dueCount(vocabulary.srsQueue)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Xayrli tong' : hour < 18 ? 'Xayrli kun' : 'Xayrli kech'

  return (
    <div className="pb-6">
      <TopBar />
      <div className="space-y-4 p-4">
        {/* Welcome */}
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-white shadow-card">
            {user.name?.[0]?.toUpperCase() || '🙂'}
          </div>
          <div>
            <p className="text-sm text-muted">{greeting},</p>
            <h1 className="text-xl font-black text-ink">{user.name} 👋</h1>
          </div>
        </div>

        {/* Streak */}
        <StreakCounter days={user.streakDays} />

        {/* XP goal */}
        <XPBar xpToday={user.xpToday} goal={state.settings.dailyXPGoal} />

        {/* Daily skill goals */}
        <div className="card p-4">
          <h3 className="mb-3 font-extrabold text-ink">Ko'nikmalar</h3>
          <div className="grid grid-cols-4 gap-2">
            {SKILLS.map((s) => (
              <div key={s.key} className="flex flex-col items-center gap-1">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full text-2xl"
                  style={{ background: `${s.color}22` }}
                >
                  {s.icon}
                </div>
                <span className="text-[11px] font-bold text-muted">{s.label}</span>
                <span className="text-xs font-black" style={{ color: s.color }}>
                  {stats.skillCounts[s.key] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Resume */}
        {resume && (
          <div className="card overflow-hidden">
            <div className="bg-primary/10 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-primary-dark">
                {resume.level} · {resume.unitTitle}
              </p>
              <h3 className="mt-1 text-lg font-black text-ink">{resume.title}</h3>
              <p className="text-sm text-muted">+{resume.xp} XP · {resume.book}</p>
            </div>
            <div className="p-4">
              <Button full size="lg" onClick={() => navigate('lesson', { lessonId: resume.id })}>
                Davom ettir
              </Button>
            </div>
          </div>
        )}

        {/* Review CTA */}
        {due > 0 && (
          <button
            onClick={() => navigate('review')}
            className="card flex w-full items-center justify-between p-4 text-left transition active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🃏</span>
              <div>
                <p className="font-extrabold text-ink">So'zlarni takrorlash</p>
                <p className="text-sm text-muted">{due} ta karta tayyor</p>
              </div>
            </div>
            <span className="text-2xl text-info">›</span>
          </button>
        )}

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          <QuickStat icon="⚡" value={user.xpTotal} label="Jami XP" />
          <QuickStat icon="✅" value={stats.lessonsDone} label="Darslar" />
          <QuickStat icon="📚" value={vocabulary.knownWords.length} label="So'zlar" />
        </div>
      </div>
    </div>
  )
}

function QuickStat({ icon, value, label }) {
  return (
    <div className="card flex flex-col items-center gap-1 p-3">
      <span className="text-2xl">{icon}</span>
      <span className="text-lg font-black text-ink">{value}</span>
      <span className="text-[11px] text-muted">{label}</span>
    </div>
  )
}
