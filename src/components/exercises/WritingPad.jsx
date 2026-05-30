import React, { useEffect, useState } from 'react'
import { Ar } from '../ui'
import ArabicKeyboard from '../ArabicKeyboard'
import { speakArabic } from '../../utils/speechUtils'

// Writing exercise (controlled): type the Arabic word using the virtual keyboard.
// Reports the typed string via setSelected.
export default function WritingPad({ step, selected, setSelected, checked, correct }) {
  const { word } = step.data
  const [showHint, setShowHint] = useState(false)
  const text = selected || ''

  useEffect(() => {
    setSelected('')
    setShowHint(false)
  }, [word.id])

  const addKey = (ch) => {
    if (checked) return
    setSelected((text || '') + ch)
  }
  const backspace = () => {
    if (checked) return
    setSelected((text || '').slice(0, -1))
  }
  const space = () => {
    if (checked) return
    setSelected((text || '') + ' ')
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-surface p-4 text-center">
        <p className="text-sm font-bold text-muted">Quyidagi so'zni arabcha yozing</p>
        <p className="mt-1 text-2xl font-black text-ink">{word.uz}</p>
        <button onClick={() => speakArabic(word.ar)} className="mt-2 text-info">
          🔊 {word.translit}
        </button>
      </div>

      {/* Input display */}
      <div
        dir="rtl"
        className={`flex min-h-[64px] items-center justify-center rounded-2xl border-2 p-3 ${
          checked ? (correct ? 'border-primary bg-primary/10' : 'border-danger bg-danger/10') : 'border-line bg-white'
        }`}
      >
        {text ? (
          <Ar size="text-4xl">{text}</Ar>
        ) : (
          <span className="text-muted">Bu yerda yoziladi...</span>
        )}
      </div>

      {checked && !correct && (
        <p className="text-center text-sm font-bold text-danger">
          To'g'ri javob: <span className="font-arabic text-xl">{word.ar}</span>
        </p>
      )}

      {!checked && (
        <>
          <button
            onClick={() => setShowHint((s) => !s)}
            className="mx-auto block rounded-full bg-line px-4 py-1 text-xs font-bold text-muted"
          >
            {showHint ? word.ar : '💡 Yordam'}
          </button>
          <ArabicKeyboard onKey={addKey} onBackspace={backspace} onSpace={space} />
        </>
      )}
    </div>
  )
}
