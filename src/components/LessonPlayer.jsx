import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useStore } from '../store/AppStore'
import { useNav } from '../store/nav'
import { getLessonById } from '../data/curriculum'
import { buildLessonSteps } from '../utils/lessonSteps'
import ExerciseEngine, { isStepCorrect, canCheck } from './ExerciseEngine'
import Hearts from './Hearts'
import { Button, ProgressBar, Sheet } from './ui'
import { accuracyPct, starsFromAccuracy, computeLessonXP } from '../utils/scoring'

// Tiny sound effect using Web Audio API.
function playTone(ok) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    if (ok) {
      osc.frequency.setValueAtTime(660, ctx.currentTime)
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1)
    } else {
      osc.frequency.setValueAtTime(220, ctx.currentTime)
      osc.frequency.setValueAtTime(160, ctx.currentTime + 0.12)
    }
    gain.gain.setValueAtTime(0.12, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.28)
    osc.start()
    osc.stop(ctx.currentTime + 0.3)
    setTimeout(() => ctx.close(), 400)
  } catch (e) {
    // ignore
  }
}

export default function LessonPlayer({ lessonId }) {
  const { state, actions } = useStore()
  const { navigate } = useNav()
  const lesson = useMemo(() => getLessonById(lessonId), [lessonId])
  const steps = useMemo(() => buildLessonSteps(lesson), [lessonId])

  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [shake, setShake] = useState(false)
  const [quitOpen, setQuitOpen] = useState(false)
  const [noHearts, setNoHearts] = useState(false)

  // tallies
  const tally = useRef({ total: 0, correct: 0, skills: {} })

  const step = steps[idx]
  const progress = steps.length ? (idx / steps.length) * 100 : 0

  useEffect(() => {
    // reset per-step state
    setSelected(null)
    setChecked(false)
    setCorrect(false)
  }, [idx])

  if (!lesson || steps.length === 0 || !step) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
        <p className="text-muted">{!lesson ? 'Dars topilmadi.' : 'Bu darsda mashqlar hali qo\'shilmagan.'}</p>
        <Button onClick={() => navigate('map')}>Yo'lga qaytish</Button>
      </div>
    )
  }

  const handleCheck = () => {
    if (!step.graded) {
      advance()
      return
    }
    const ok = isStepCorrect(step, selected)
    setCorrect(ok)
    setChecked(true)
    tally.current.total += 1
    if (ok) tally.current.correct += 1
    if (step.skill) {
      tally.current.skills[step.skill] = (tally.current.skills[step.skill] || 0) + 1
    }
    if (state.settings.soundEffects) playTone(ok)
    if (!ok) {
      setShake(true)
      setTimeout(() => setShake(false), 450)
      actions.loseHeart()
      // hearts will update; gate checked on continue
    }
  }

  const advance = () => {
    // out-of-hearts gate (only when a wrong answer just consumed the last heart)
    if (checked && !correct && state.user.hearts <= 0) {
      setNoHearts(true)
      return
    }
    if (idx + 1 >= steps.length) {
      finish()
    } else {
      setIdx((i) => i + 1)
    }
  }

  const finish = () => {
    const { total, correct: cor, skills } = tally.current
    const acc = total > 0 ? cor / total : 1
    const accPct = accuracyPct(cor, total) || (total === 0 ? 100 : 0)
    const stars = total > 0 ? starsFromAccuracy(acc) : 3
    const perfect = total > 0 && cor === total
    const xpGained = computeLessonXP({ baseXP: lesson.xp || 10, correct: cor, total, perfect })

    const result = {
      lessonId: lesson.id,
      accuracy: total === 0 ? 100 : accPct,
      stars,
      xpGained,
      perfect,
      correct: cor,
      total,
      skillCounts: skills,
      learnedWordIds: lesson.vocabIds || [],
    }
    actions.completeLesson(result)
    navigate('results', { result, lessonId: lesson.id })
  }

  const checkable = canCheck(step, selected)
  const footerLabel = !step.graded ? 'Davom etish' : checked ? 'Davom etish' : 'Tekshirish'

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3">
        <button onClick={() => setQuitOpen(true)} className="text-2xl text-muted">
          ✕
        </button>
        <div className="flex-1">
          <ProgressBar value={idx} max={steps.length} color="bg-primary" height="h-4" />
        </div>
        <Hearts value={state.user.hearts} size="text-base" />
      </header>

      {/* Exercise area */}
      <div className={`flex-1 overflow-y-auto px-4 pb-40 pt-2 ${shake ? 'animate-shake' : ''}`}>
        <h2 className="mb-4 text-xl font-black text-ink">{step.prompt}</h2>
        <ExerciseEngine
          step={step}
          selected={selected}
          setSelected={setSelected}
          checked={checked}
          correct={correct}
        />
      </div>

      {/* Feedback + footer */}
      <footer
        className={`fixed inset-x-0 bottom-0 mx-auto w-full max-w-[480px] border-t-2 p-4 transition-colors ${
          checked
            ? correct
              ? 'border-primary bg-primary/10'
              : 'border-danger bg-danger/10'
            : 'border-line bg-white'
        }`}
      >
        {checked && step.graded && (
          <div className={`mb-3 flex items-center gap-2 font-black ${correct ? 'text-primary' : 'text-danger'}`}>
            <span className="text-2xl">{correct ? '✅' : '❌'}</span>
            <span>{correct ? "To'g'ri!" : 'Xato. Davom eting.'}</span>
          </div>
        )}
        <Button
          full
          size="lg"
          variant={checked && !correct ? 'danger' : 'primary'}
          disabled={!step.graded ? false : !checked && !checkable}
          onClick={checked || !step.graded ? advance : handleCheck}
        >
          {footerLabel}
        </Button>
      </footer>

      {/* Quit confirm */}
      <Sheet open={quitOpen} onClose={() => setQuitOpen(false)}>
        <h3 className="text-xl font-black text-ink">Darsni tark etasizmi?</h3>
        <p className="mt-2 text-muted">Bu darsdagi yutuqlaringiz saqlanmaydi.</p>
        <div className="mt-5 flex gap-3">
          <Button variant="ghost" full onClick={() => setQuitOpen(false)}>
            Davom etish
          </Button>
          <Button variant="danger" full onClick={() => navigate('map')}>
            Chiqish
          </Button>
        </div>
      </Sheet>

      {/* Out of hearts */}
      <Sheet open={noHearts} onClose={() => {}}>
        <div className="text-center">
          <div className="mb-2 text-5xl">💔</div>
          <h3 className="text-xl font-black text-ink">Jonlaringiz tugadi</h3>
          <p className="mt-2 text-muted">
            Davom etish uchun jonlarni tiklang yoki keyinroq qayting (har 30 daqiqada +1 jon).
          </p>
          <div className="mt-5 space-y-3">
            <Button
              full
              variant="gold"
              disabled={state.user.gems < 30}
              onClick={() => {
                actions.refillHearts(30)
                setNoHearts(false)
              }}
            >
              💎 30 gavharga to'ldirish ({state.user.gems})
            </Button>
            <Button full variant="ghost" onClick={() => navigate('map')}>
              Keyinroq
            </Button>
          </div>
        </div>
      </Sheet>
    </div>
  )
}
