import React, { useState } from 'react'
import { useStore } from '../store/AppStore'
import { useNav } from '../store/nav'
import { Button, Sheet } from './ui'
import { ttsSupported, recognitionSupported, hasArabicVoice, getAudioStatus } from '../utils/speechUtils'

export default function Settings() {
  const { state, actions } = useStore()
  const { navigate } = useNav()
  const { settings } = state
  const [confirmReset, setConfirmReset] = useState(false)

  const goalOptions = [20, 50, 100, 150]

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b-2 border-line bg-white px-4 py-3">
        <button onClick={() => navigate('profile')} className="text-2xl">
          ‹
        </button>
        <h1 className="text-lg font-black text-ink">Sozlamalar</h1>
      </header>

      <div className="space-y-4 p-4">
        {/* Daily goal */}
        <Section title="Kunlik XP maqsadi">
          <div className="grid grid-cols-4 gap-2">
            {goalOptions.map((g) => (
              <button
                key={g}
                onClick={() => actions.updateSettings({ dailyXPGoal: g })}
                className={`rounded-xl border-2 py-2 font-black transition ${
                  settings.dailyXPGoal === g ? 'border-primary bg-primary/10 text-primary-dark' : 'border-line text-muted'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </Section>

        {/* Toggles */}
        <Section title="O'rganish">
          <Toggle
            label="Harakatlarni ko'rsatish"
            desc="Qisqa unlilar (fatha, kasra, damma)"
            value={settings.showHarakat}
            onChange={(v) => actions.updateSettings({ showHarakat: v })}
          />
          <Toggle
            label="Audio avtomatik"
            desc="So'zlarni avtomatik o'qib berish"
            value={settings.autoPlayAudio}
            onChange={(v) => actions.updateSettings({ autoPlayAudio: v })}
          />
          <Toggle
            label="Ovozli effektlar"
            desc="To'g'ri/xato javob tovushlari"
            value={settings.soundEffects}
            onChange={(v) => actions.updateSettings({ soundEffects: v })}
          />
        </Section>

        {/* Font size */}
        <Section title="Arab matn o'lchami">
          <div className="flex items-center gap-3">
            {[
              { v: 0.9, label: 'Kichik' },
              { v: 1, label: "O'rta" },
              { v: 1.2, label: 'Katta' },
            ].map((o) => (
              <button
                key={o.v}
                onClick={() => actions.updateSettings({ fontScale: o.v })}
                className={`flex-1 rounded-xl border-2 py-2 font-bold transition ${
                  settings.fontScale === o.v ? 'border-primary bg-primary/10 text-primary-dark' : 'border-line text-muted'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </Section>

        {/* Device support */}
        <Section title="Qurilma imkoniyatlari">
          <Support label="Audio manba" ok={getAudioStatus().lingvaAvailable !== false} note={
            getAudioStatus().source === 'lingva' ? 'Lingva TTS (Google neural)' : 'Brauzer TTS'
          } />
          <Support label="Keshlanган audiolar" ok={getAudioStatus().cachedCount > 0} note={`${getAudioStatus().cachedCount} ta`} />
          <Support label="Ovoz chiqarish (TTS)" ok={ttsSupported()} />
          <Support label="Arabcha ovoz" ok={hasArabicVoice()} note="Brauzerga bog'liq" />
          <Support label="Nutqni tanish (mikrofon)" ok={recognitionSupported()} />
        </Section>

        <Button full variant="danger" onClick={() => setConfirmReset(true)}>
          Hamma narsani tiklash
        </Button>
        <p className="text-center text-xs text-muted">Versiya 1.0 · Al-Manhaj & At-Takallum</p>
      </div>

      <Sheet open={confirmReset} onClose={() => setConfirmReset(false)}>
        <h3 className="text-xl font-black text-ink">Ishonchingiz komilmi?</h3>
        <p className="mt-2 text-muted">
          Barcha XP, streak, so'zlar va yutuqlar o'chiriladi. Bu amalni ortga qaytarib bo'lmaydi.
        </p>
        <div className="mt-5 flex gap-3">
          <Button variant="ghost" full onClick={() => setConfirmReset(false)}>
            Bekor qilish
          </Button>
          <Button
            variant="danger"
            full
            onClick={() => {
              actions.reset()
              setConfirmReset(false)
              navigate('landing')
            }}
          >
            Tiklash
          </Button>
        </div>
      </Sheet>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="card p-4">
      <h3 className="mb-3 font-extrabold text-ink">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Toggle({ label, desc, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="font-bold text-ink">{label}</p>
        {desc && <p className="text-xs text-muted">{desc}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative h-7 w-12 rounded-full transition ${value ? 'bg-primary' : 'bg-line'}`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${
            value ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </button>
    </div>
  )
}

function Support({ label, ok, note }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-bold text-ink">{label}</span>
      <span className={`text-sm font-bold ${ok ? 'text-primary' : 'text-muted'}`}>
        {ok ? '✓ Mavjud' : note || 'Mavjud emas'}
      </span>
    </div>
  )
}
