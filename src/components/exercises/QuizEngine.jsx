import React, { useEffect, useState } from 'react'
import { Ar } from '../ui'
import { speakArabic, isAudioCached } from '../../utils/speechUtils'
import { useStore } from '../../store/AppStore'

// Generic multiple-choice exercise (controlled).
// Handles recognition, grammar blanks, reading questions, listening (audio header), final quiz.
export default function QuizEngine({ step, selected, setSelected, checked, correct }) {
  const { state } = useStore()
  const { data } = step
  const isListening = !!data.audio
  const [rate, setRate] = useState(0.8)
  const [playing, setPlaying] = useState(false)

  const playAudio = async (r) => {
    setPlaying(true)
    await speakArabic(data.audio, { rate: r })
    setPlaying(false)
  }

  useEffect(() => {
    if (isListening && state.settings.autoPlayAudio) {
      const t = setTimeout(() => playAudio(rate), 300)
      return () => clearTimeout(t)
    }
  }, [step])

  return (
    <div className="space-y-5">
      {/* Listening header */}
      {isListening && (
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => playAudio(rate)}
            disabled={playing}
            className={`flex h-24 w-24 items-center justify-center rounded-3xl bg-info text-5xl text-white shadow-card transition active:scale-95 ${
              playing ? 'animate-pulse' : ''
            }`}
          >
            {playing ? '🎵' : '🔊'}
          </button>
          <p className="text-xs font-bold text-muted">
            {playing ? 'Tinglayapsiz...' : 'Tinglash uchun bosing'}
          </p>
          <div className="flex gap-2">
            {[0.5, 0.8, 1].map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRate(r)
                  playAudio(r)
                }}
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  rate === r ? 'bg-info text-white' : 'bg-line text-muted'
                }`}
              >
                {r === 0.5 ? '0.5x' : r === 0.8 ? '1x' : '1.5x'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Arabic header (prompt word / sentence) */}
      {data.headerAr && (
        <div className="flex flex-col items-center gap-1 rounded-2xl bg-surface p-5">
          <Ar size="text-4xl" className="text-ink">
            {data.headerAr}
          </Ar>
          {data.translit && <p className="text-sm font-bold text-muted">{data.translit}</p>}
        </div>
      )}

      {/* Options */}
      <div className={`grid gap-3 ${data.optionType === 'ar' ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {data.options.map((opt) => {
          const isSel = selected === opt
          const isAnswer = opt === step.answer
          let cls = 'border-line bg-white text-ink'
          if (checked) {
            if (isAnswer) cls = 'border-primary bg-primary/10 text-primary-dark'
            else if (isSel) cls = 'border-danger bg-danger/10 text-danger'
            else cls = 'border-line bg-white text-muted opacity-60'
          } else if (isSel) {
            cls = 'border-info bg-info/10 text-info'
          }
          return (
            <button
              key={opt}
              disabled={checked}
              onClick={() => setSelected(opt)}
              className={`flex items-center justify-center rounded-2xl border-2 p-4 font-bold transition active:scale-[0.98] ${cls}`}
            >
              {data.optionType === 'ar' ? (
                <Ar size="text-3xl">{opt}</Ar>
              ) : data.optionType === 'emoji' ? (
                <span className="text-4xl">{opt}</span>
              ) : (
                <span>{opt}</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Explanation after check */}
      {checked && data.explanation && (
        <div className={`rounded-2xl p-3 text-sm font-bold ${correct ? 'bg-primary/10 text-primary-dark' : 'bg-danger/10 text-danger'}`}>
          💡 {data.explanation}
        </div>
      )}
    </div>
  )
}
