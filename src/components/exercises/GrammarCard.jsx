import React from 'react'
import { Ar } from '../ui'
import { speakArabic } from '../../utils/speechUtils'

// Grammar rule explanation (intro, not graded).
export default function GrammarCard({ step }) {
  const { grammar } = step.data
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-purple/10 p-4">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-2xl">📐</span>
          <h3 className="text-lg font-black text-ink">{grammar.title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-ink">{grammar.summary}</p>
      </div>

      <div className="space-y-2">
        {grammar.points.map((p, i) => (
          <div key={i} className="card flex items-start gap-3 p-3">
            <Ar size="text-2xl" className="text-purple shrink-0">
              {p.ar}
            </Ar>
            <p className="text-sm text-ink">{p.uz}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="mb-2 text-sm font-extrabold text-muted">Misollar</p>
        <div className="space-y-2">
          {grammar.examples.map((e, i) => (
            <button
              key={i}
              onClick={() => speakArabic(e.ar)}
              className="card flex w-full items-center justify-between gap-3 p-3 text-left active:scale-[0.99]"
            >
              <div>
                <Ar size="text-2xl" className="text-ink">
                  {e.ar}
                </Ar>
                <p className="mt-1 text-sm text-muted">{e.uz}</p>
              </div>
              <span className="text-xl text-info">🔊</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
