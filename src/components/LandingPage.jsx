import React, { useState } from 'react'
import { useStore } from '../store/AppStore'
import { useNav } from '../store/nav'
import { Button, Ar } from './ui'
import { LEVEL_META, LEVEL_ORDER, curriculumStats } from '../data/curriculum'
import { VOCAB_COUNT } from '../data/vocabulary'

export default function LandingPage() {
  const { actions } = useStore()
  const { navigate } = useNav()
  const [step, setStep] = useState('hero') // hero | level | name
  const [level, setLevel] = useState('A1')
  const [name, setName] = useState('')

  const stats = curriculumStats()

  const finish = () => {
    actions.onboard(name.trim() || 'Talaba', level)
    navigate('dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-primary/10 to-white">
      {/* Hero */}
      {step === 'hero' && (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center animate-fadeIn">
          <div className="mb-4 text-7xl">📖</div>
          <Ar size="text-5xl" className="mb-3 font-bold text-primary-dark">
            تَعَلَّمِ الْعَرَبِيَّةَ
          </Ar>
          <h1 className="mb-2 text-3xl font-black text-ink">Arab tilini mukammal o'rgan</h1>
          <p className="mb-6 max-w-xs text-muted">
            Al-Manhaj va At-Takallum asosida A1 dan C2 gacha. Duolingo uslubidagi qiziqarli darslar.
          </p>

          <div className="mb-8 flex gap-3">
            <Stat n={`${stats.levels} daraja`} />
            <Stat n={`${stats.lessons} dars`} />
            <Stat n={`${VOCAB_COUNT}+ so'z`} />
          </div>

          <Button size="lg" full className="max-w-xs" onClick={() => setStep('level')}>
            Boshlash
          </Button>
        </div>
      )}

      {/* Level selector */}
      {step === 'level' && (
        <div className="flex flex-1 flex-col px-5 py-8 animate-slideUp">
          <h2 className="mb-1 text-2xl font-black text-ink">Darajangizni tanlang</h2>
          <p className="mb-5 text-muted">Qaysi darajadan boshlamoqchisiz?</p>
          <div className="flex flex-col gap-3">
            {LEVEL_ORDER.map((lv) => {
              const meta = LEVEL_META[lv]
              const active = level === lv
              return (
                <button
                  key={lv}
                  onClick={() => setLevel(lv)}
                  className={`card flex items-center gap-3 p-4 text-left transition ${
                    active ? 'border-primary ring-2 ring-primary/30' : ''
                  }`}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl font-black text-white"
                    style={{ background: meta.color }}
                  >
                    {lv}
                  </div>
                  <div className="flex-1">
                    <p className="font-extrabold text-ink">{meta.title}</p>
                    <p className="text-xs text-muted">{meta.desc}</p>
                  </div>
                  {active && <span className="text-primary text-xl">✓</span>}
                </button>
              )
            })}
          </div>
          <div className="mt-6">
            <Button full size="lg" onClick={() => setStep('name')}>
              Davom etish
            </Button>
          </div>
        </div>
      )}

      {/* Name */}
      {step === 'name' && (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center animate-slideUp">
          <div className="mb-4 text-6xl">👋</div>
          <h2 className="mb-2 text-2xl font-black text-ink">Ismingiz nima?</h2>
          <p className="mb-6 text-muted">Sizni qanday chaqiraylik?</p>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && finish()}
            placeholder="Ismingiz"
            className="mb-6 w-full max-w-xs rounded-2xl border-2 border-line px-4 py-3 text-center text-lg font-bold outline-none focus:border-primary"
          />
          <Button size="lg" full className="max-w-xs" onClick={finish}>
            Boshlaymiz! 🚀
          </Button>
        </div>
      )}
    </div>
  )
}

function Stat({ n }) {
  return (
    <div className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-ink shadow-card">{n}</div>
  )
}
