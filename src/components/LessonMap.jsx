import React, { useMemo, useState } from 'react'
import { useStore } from '../store/AppStore'
import { useNav } from '../store/nav'
import TopBar from './TopBar'
import { Button, Sheet, Stars } from './ui'
import { CURRICULUM, LEVEL_ORDER, LEVEL_META, flattenLessons } from '../data/curriculum'

export default function LessonMap() {
  const { state } = useStore()
  const { navigate } = useNav()
  const [selected, setSelected] = useState(null)

  const flat = useMemo(() => flattenLessons(), [])
  const completed = new Set(state.progress.completedLessons)
  const mastered = new Set(state.progress.masteredLessons)
  const orderIndex = useMemo(() => Object.fromEntries(flat.map((l, i) => [l.id, i])), [flat])

  // a lesson is unlocked if first or previous completed
  const isUnlocked = (id) => {
    const i = orderIndex[id]
    if (i === 0) return true
    const prev = flat[i - 1]
    return completed.has(prev.id)
  }

  const lessonScore = (id) => state.progress.lessonScores[id]

  return (
    <div className="pb-8">
      <TopBar title="O'quv yo'li" />

      <div className="px-4 py-4">
        {LEVEL_ORDER.map((level) => {
          const meta = LEVEL_META[level]
          const lv = CURRICULUM[level]
          const lessonCount = lv.units.reduce((a, u) => a + (u.lessons?.length || 0), 0)
          return (
            <section key={level} className="mb-6">
              {/* Level banner */}
              <div
                className="mb-4 rounded-2xl p-4 text-white shadow-card"
                style={{ background: meta.color }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold opacity-90">DARAJA {level}</p>
                    <h2 className="text-lg font-black">{meta.title}</h2>
                  </div>
                  <span className="rounded-full bg-white/25 px-3 py-1 text-sm font-bold">
                    {lessonCount} dars
                  </span>
                </div>
              </div>

              {/* Units & lessons */}
              {lv.units.map((unit) => (
                <div key={unit.id} className="mb-4">
                  <div className="mb-2 flex items-center gap-2 px-1">
                    <span className="text-sm font-extrabold text-ink">{unit.title}</span>
                    <span className="text-xs text-muted">· {unit.book}</span>
                  </div>

                  {(!unit.lessons || unit.lessons.length === 0) && (
                    <div className="card flex items-center gap-3 p-4 opacity-70">
                      <span className="text-2xl">🔜</span>
                      <span className="text-sm font-bold text-muted">Tez orada qo'shiladi</span>
                    </div>
                  )}

                  <div className="flex flex-col items-center gap-3">
                    {(unit.lessons || []).map((lesson, idx) => {
                      const unlocked = isUnlocked(lesson.id)
                      const done = completed.has(lesson.id)
                      const isMastered = mastered.has(lesson.id)
                      // zig-zag horizontal offset
                      const offset = [0, -56, -84, -56, 0, 56, 84, 56][idx % 8]
                      const fullLesson = { ...lesson, level, unitTitle: unit.title, book: unit.book }
                      return (
                        <div key={lesson.id} className="flex w-full justify-center" style={{ transform: `translateX(${offset}px)` }}>
                          <LessonNode
                            color={meta.color}
                            unlocked={unlocked}
                            done={done}
                            mastered={isMastered}
                            onClick={() => unlocked && setSelected(fullLesson)}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </section>
          )
        })}
      </div>

      {/* Lesson preview sheet */}
      <Sheet open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted">
              {selected.level} · {selected.unitTitle}
            </p>
            <h3 className="mt-1 text-2xl font-black text-ink">{selected.title}</h3>

            {lessonScore(selected.id) && (
              <div className="mt-2 flex items-center gap-2">
                <Stars count={lessonScore(selected.id).stars} size="text-lg" />
                <span className="text-sm text-muted">{lessonScore(selected.id).accuracy}% aniqlik</span>
              </div>
            )}

            <ul className="mt-4 space-y-2">
              {(selected.objectives || []).map((o, i) => (
                <li key={i} className="flex items-center gap-2 text-ink">
                  <span className="text-primary">✓</span>
                  <span className="font-bold">{o}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center gap-3 text-sm font-bold text-muted">
              <span>⚡ +{selected.xp} XP</span>
              <span>📘 {selected.book}</span>
            </div>

            <div className="mt-5">
              <Button
                full
                size="lg"
                onClick={() => {
                  const id = selected.id
                  setSelected(null)
                  // Small delay to let sheet close animation start
                  setTimeout(() => navigate('lesson', { lessonId: id }), 50)
                }}
              >
                {completed.has(selected.id) ? 'Qayta ishlash' : 'Boshlash'}
              </Button>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  )
}

function LessonNode({ color, unlocked, done, mastered, onClick }) {
  let bg = '#E5E5E5'
  let icon = '🔒'
  let ring = 'transparent'
  if (mastered) {
    bg = '#FFC800'
    icon = '👑'
  } else if (done) {
    bg = color
    icon = '✓'
  } else if (unlocked) {
    bg = color
    icon = '★'
    ring = `${color}55`
  }

  return (
    <button
      onClick={onClick}
      disabled={!unlocked}
      className={`relative flex h-[68px] w-[68px] items-center justify-center rounded-full text-2xl font-black text-white transition active:scale-95 ${
        unlocked ? '' : 'cursor-not-allowed'
      }`}
      style={{
        background: bg,
        boxShadow: `0 6px 0 0 rgba(0,0,0,0.18)`,
        outline: unlocked && !done ? `6px solid ${ring}` : 'none',
      }}
    >
      <span className={unlocked ? '' : 'opacity-70 text-base'}>{icon}</span>
    </button>
  )
}
