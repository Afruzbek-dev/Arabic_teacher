import React, { useEffect, useRef, useState } from 'react'
import { Ar } from '../ui'
import { speakArabic, listenForArabic, recognitionSupported } from '../../utils/speechUtils'
import { arabicSimilarity } from '../../utils/scoring'

const PASS = 50

// Speaking practice (controlled). Reports {passed, score, transcript} via setSelected.
export default function SpeakingExercise({ step, selected, setSelected, checked }) {
  const { word } = step.data
  const supported = recognitionSupported()
  const [status, setStatus] = useState('idle') // idle | listening | done | error
  const [attempts, setAttempts] = useState(0)
  const recRef = useRef(null)

  useEffect(() => {
    setStatus('idle')
    setAttempts(0)
    const t = setTimeout(() => speakArabic(word.ar), 300)
    return () => {
      clearTimeout(t)
      recRef.current?.abort?.()
    }
  }, [word.id])

  const record = () => {
    if (!supported || attempts >= 3) return
    setStatus('listening')
    recRef.current = listenForArabic({
      onResult: (best) => {
        const score = arabicSimilarity(best, word.ar)
        setSelected({ passed: score >= PASS, score, transcript: best })
        setStatus('done')
      },
      onError: () => {
        setStatus('error')
      },
      onEnd: () => {
        setStatus((s) => (s === 'listening' ? 'idle' : s))
      },
    })
    setAttempts((a) => a + 1)
  }

  const score = selected?.score
  const passed = selected?.passed

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-col items-center gap-2 rounded-2xl bg-surface p-6">
        <Ar size="text-5xl" className="text-ink">
          {word.ar}
        </Ar>
        <p className="font-bold text-muted">{word.translit}</p>
        <p className="text-sm text-muted">{word.uz}</p>
      </div>

      <button
        onClick={() => speakArabic(word.ar)}
        className="flex items-center gap-2 rounded-full bg-info px-4 py-2 font-bold text-white"
      >
        🔊 Eshitish
      </button>

      {supported ? (
        <>
          <button
            onClick={record}
            disabled={status === 'listening' || checked || attempts >= 3}
            className={`flex h-24 w-24 items-center justify-center rounded-full text-5xl text-white shadow-card transition ${
              status === 'listening' ? 'animate-pulse bg-danger' : 'bg-accent active:scale-95'
            } disabled:opacity-50`}
          >
            🎤
          </button>
          <p className="text-sm font-bold text-muted">
            {status === 'listening'
              ? 'Tinglanmoqda... gapiring'
              : status === 'error'
              ? 'Qayta urinib ko\'ring'
              : `Mikrofonni bosing (${3 - attempts} urinish qoldi)`}
          </p>

          {selected && status === 'done' && (
            <div className="w-full text-center">
              <p className={`text-3xl font-black ${passed ? 'text-primary' : 'text-danger'}`}>{score}%</p>
              <p className="text-sm text-muted">Siz: «{selected.transcript}»</p>
              <p className={`mt-1 font-bold ${passed ? 'text-primary' : 'text-danger'}`}>
                {passed ? "Ajoyib talaffuz! 👏" : 'Yana mashq qiling 💪'}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="w-full text-center">
          <p className="mb-3 text-sm text-muted">
            Brauzeringiz mikrofonni qo'llab-quvvatlamaydi. Ovoz chiqarib takrorlang, so'ng tasdiqlang.
          </p>
          <button
            onClick={() => setSelected({ passed: true, score: 100, transcript: '(qo\'lda tasdiqlandi)' })}
            disabled={checked}
            className={`rounded-2xl px-5 py-3 font-bold text-white ${selected ? 'bg-primary' : 'bg-accent'}`}
          >
            {selected ? '✓ Takrorladim' : 'Takrorladim'}
          </button>
        </div>
      )}
    </div>
  )
}
