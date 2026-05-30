import React, { useEffect } from 'react'
import { Ar } from '../ui'
import { speakArabic } from '../../utils/speechUtils'
import { useStore } from '../../store/AppStore'

// Alphabet letter introduction (not graded).
export default function LetterCard({ step }) {
  const { letter } = step.data
  const { state } = useStore()

  useEffect(() => {
    if (state.settings.autoPlayAudio) {
      const t = setTimeout(() => speakArabic(letter.ar), 350)
      return () => clearTimeout(t)
    }
  }, [letter.ar])

  // Show the 3 connected forms for awareness.
  const forms = [
    { f: letter.ar, label: 'Mustaqil' },
    { f: letter.ar + 'ـ', label: 'Boshida' },
    { f: 'ـ' + letter.ar + 'ـ', label: "O'rtada" },
  ]

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex h-56 w-56 flex-col items-center justify-center rounded-3xl border-2 border-primary bg-white">
        <Ar size="text-[7rem]" className="leading-none text-primary-dark">
          {letter.ar}
        </Ar>
      </div>
      <div className="text-center">
        <p className="text-2xl font-black text-ink">{letter.name}</p>
        <p className="text-muted">tovushi: «{letter.translit}»</p>
      </div>
      <button
        onClick={() => speakArabic(letter.ar)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-info text-2xl text-white"
      >
        🔊
      </button>

      <div className="grid w-full grid-cols-3 gap-2">
        {forms.map((fm, i) => (
          <div key={i} className="card flex flex-col items-center gap-1 p-3">
            <Ar size="text-3xl">{fm.f}</Ar>
            <span className="text-[10px] text-muted">{fm.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
