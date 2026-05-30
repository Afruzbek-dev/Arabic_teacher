import React, { useEffect, useState } from 'react'
import { Ar } from '../ui'
import { speakArabic } from '../../utils/speechUtils'
import { useStore } from '../../store/AppStore'

// Teaching flashcard (intro, not graded). Tap to flip.
export default function VocabFlashcard({ step }) {
  const { word } = step.data
  const { state } = useStore()
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setFlipped(false)
    if (state.settings.autoPlayAudio) {
      const t = setTimeout(() => speakArabic(word.ar), 350)
      return () => clearTimeout(t)
    }
  }, [word.id])

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-sm font-bold text-muted">Kartani aylantirish uchun bosing</p>
      <button
        onClick={() => setFlipped((f) => !f)}
        className="relative h-72 w-full max-w-xs"
        style={{ perspective: 1000 }}
      >
        <div
          className="relative h-full w-full transition-transform duration-500"
          style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'none' }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-primary bg-white"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <Ar size="text-6xl" className="text-ink">
              {word.ar}
            </Ar>
            <p className="text-lg font-bold text-muted">{word.translit}</p>
            <span
              onClick={(e) => {
                e.stopPropagation()
                speakArabic(word.ar)
              }}
              className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-info text-2xl text-white"
            >
              🔊
            </span>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-accent bg-accent/10"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <span className="text-7xl">{word.emoji}</span>
            <p className="text-3xl font-black text-ink">{word.uz}</p>
          </div>
        </div>
      </button>
    </div>
  )
}
