import React, { useState } from 'react'
import { Ar } from '../ui'
import { speakArabic } from '../../utils/speechUtils'

// Reading passage with tap-to-reveal word meanings + translation toggle.
export default function ReadingPassage({ step }) {
  const { passage } = step.data
  const [revealed, setRevealed] = useState(null)
  const [showUz, setShowUz] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-ink">{passage.title}</h3>
        <button
          onClick={() => speakArabic(passage.text)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-info text-xl text-white"
        >
          🔊
        </button>
      </div>

      {/* Word-by-word (tap to reveal) */}
      <div dir="rtl" className="flex flex-wrap gap-x-2 gap-y-3 rounded-2xl bg-surface p-4 leading-loose">
        {passage.tokens.map((t, i) => (
          <button
            key={i}
            onClick={() => {
              setRevealed(revealed === i ? null : i)
              speakArabic(t.ar)
            }}
            className="relative"
          >
            <Ar size="text-3xl" className={`${revealed === i ? 'text-info' : 'text-ink'}`}>
              {t.ar}
            </Ar>
            {revealed === i && (
              <span className="absolute -bottom-4 right-1/2 translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold text-white">
                {t.uz}
              </span>
            )}
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-muted">So'z ma'nosini ko'rish uchun unга bosing</p>

      <button
        onClick={() => setShowUz((s) => !s)}
        className="w-full rounded-2xl border-2 border-line p-3 text-sm font-bold text-info"
      >
        {showUz ? 'Tarjimani yashirish' : "Tarjimani ko'rsatish"}
      </button>
      {showUz && <p className="rounded-2xl bg-primary/10 p-3 text-center font-bold text-ink">{passage.uz}</p>}
    </div>
  )
}
