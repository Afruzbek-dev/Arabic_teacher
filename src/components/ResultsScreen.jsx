import React, { useEffect, useState } from 'react'
import { useNav } from '../store/nav'
import { Button, Confetti, Gauge, Stars } from './ui'
import { flattenLessons } from '../data/curriculum'

const SKILL_META = {
  reading: { icon: '📖', label: "O'qish" },
  writing: { icon: '✍️', label: 'Yozish' },
  listening: { icon: '🎧', label: 'Tinglash' },
  speaking: { icon: '🗣️', label: 'Gapirish' },
}

export default function ResultsScreen({ result, lessonId }) {
  const { navigate } = useNav()
  const [xpShown, setXpShown] = useState(0)

  const r = result || { accuracy: 100, stars: 3, xpGained: 10, skillCounts: {}, perfect: false }

  // count-up XP animation
  useEffect(() => {
    let raf
    const target = r.xpGained
    const start = performance.now()
    const dur = 900
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur)
      setXpShown(Math.round(p * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [r.xpGained])

  // next lesson
  const all = flattenLessons()
  const i = all.findIndex((l) => l.id === lessonId)
  const next = i >= 0 && i + 1 < all.length ? all[i + 1] : null

  const gaugeColor = r.accuracy >= 80 ? '#58CC02' : r.accuracy >= 50 ? '#FF9600' : '#FF4B4B'

  const headline = r.perfect ? "Mukammal! 🌟" : r.accuracy >= 80 ? "Ajoyib ish! 🎉" : "Yaxshi harakat! 💪"

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-5 py-8">
      <Confetti pieces={r.accuracy >= 80 ? 70 : 30} />

      <div className="z-10 w-full max-w-sm animate-slideUp space-y-5 text-center">
        <div className="text-6xl">{r.perfect ? '🏆' : '🎯'}</div>
        <h1 className="text-3xl font-black text-ink">{headline}</h1>
        <Stars count={r.stars} size="text-4xl" />

        {/* XP + accuracy */}
        <div className="flex items-center justify-center gap-4">
          <div className="card flex flex-col items-center gap-1 p-4">
            <span className="text-3xl font-black text-accent">+{xpShown}</span>
            <span className="text-xs font-bold text-muted">XP</span>
          </div>
          <Gauge value={r.accuracy} label="aniqlik" color={gaugeColor} size={110} />
        </div>

        {/* Skill breakdown */}
        {Object.keys(r.skillCounts || {}).length > 0 && (
          <div className="card p-4">
            <p className="mb-3 text-sm font-extrabold text-muted">Ko'nikmalar mashqi</p>
            <div className="flex justify-around">
              {Object.entries(r.skillCounts).map(([k, v]) => (
                <div key={k} className="flex flex-col items-center gap-1">
                  <span className="text-2xl">{SKILL_META[k]?.icon || '•'}</span>
                  <span className="text-xs font-bold text-ink">{SKILL_META[k]?.label || k}</span>
                  <span className="text-xs font-black text-primary">×{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3 pt-2">
          {next ? (
            <Button full size="lg" onClick={() => navigate('lesson', { lessonId: next.id })}>
              Keyingi dars →
            </Button>
          ) : (
            <Button full size="lg" onClick={() => navigate('map')}>
              O'quv yo'liga qaytish
            </Button>
          )}
          <div className="flex gap-3">
            <Button variant="ghost" full onClick={() => navigate('lesson', { lessonId })}>
              Qayta ishlash
            </Button>
            <Button variant="ghost" full onClick={() => navigate('dashboard')}>
              Bosh sahifa
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
