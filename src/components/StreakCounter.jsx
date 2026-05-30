import React from 'react'

const MILESTONES = [3, 7, 14, 30, 60, 100, 365]

export default function StreakCounter({ days, compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-1 font-black text-accent">
        <span className="text-lg">🔥</span>
        <span>{days}</span>
      </div>
    )
  }

  const next = MILESTONES.find((m) => m > days) || days
  const prev = [...MILESTONES].reverse().find((m) => m <= days) || 0
  const span = Math.max(1, next - prev)
  const into = days - prev
  const pct = Math.min(100, Math.round((into / span) * 100))

  return (
    <div className="card p-4">
      <div className="flex items-center gap-3">
        <div className="text-4xl animate-pop">🔥</div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-accent">{days}</span>
            <span className="font-bold text-muted">kunlik streak</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-1 text-xs text-muted">
            {days >= 365 ? 'Afsonaviy!' : `Keyingi bosqich: ${next} kun`}
          </p>
        </div>
      </div>
    </div>
  )
}
