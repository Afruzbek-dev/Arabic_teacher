import React from 'react'
import { ProgressBar } from './ui'

// Daily XP progress toward goal.
export default function XPBar({ xpToday, goal }) {
  const reached = xpToday >= goal
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 font-extrabold text-ink">
          <span className="text-xl">⚡</span>
          <span>Kunlik maqsad</span>
        </div>
        <span className={`font-black ${reached ? 'text-primary' : 'text-accent'}`}>
          {xpToday} / {goal} XP
        </span>
      </div>
      <ProgressBar value={xpToday} max={goal} color={reached ? 'bg-primary' : 'bg-accent'} />
      {reached && <p className="mt-2 text-sm font-bold text-primary">🎉 Bugungi maqsadga erishdingiz!</p>}
    </div>
  )
}
