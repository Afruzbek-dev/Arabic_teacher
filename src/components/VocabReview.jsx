import React, { useEffect, useMemo, useState } from 'react'
import { useStore } from '../store/AppStore'
import { useNav } from '../store/nav'
import { Ar, Button, Confetti, ProgressBar } from './ui'
import { dueCards, newCard, nextReviewLabel } from '../utils/srs'
import { getWord, VOCAB } from '../data/vocabulary'
import { speakArabic } from '../utils/speechUtils'
import { LEVEL_ORDER } from '../data/curriculum'

// Spaced-repetition flashcard review.
export default function VocabReview() {
  const { state, actions } = useStore()
  const { navigate } = useNav()

  // Build the review session once on mount.
  const session = useMemo(() => {
    const due = dueCards(state.vocabulary.srsQueue, Date.now(), 20)
    let cards = due.map((c) => c.wordId).filter((id) => getWord(id))
    // If nothing due, offer some new words around the user's level to learn.
    if (cards.length === 0) {
      const learned = new Set(state.vocabulary.knownWords)
      const levelIdx = LEVEL_ORDER.indexOf(state.user.level)
      const candidates = VOCAB.filter((w) => {
        const wi = LEVEL_ORDER.indexOf(w.level)
        return wi <= levelIdx + 0 && !learned.has(w.id)
      })
      cards = (candidates.length ? candidates : VOCAB.filter((w) => !learned.has(w.id)))
        .slice(0, 10)
        .map((w) => w.id)
    }
    return cards
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [queue, setQueue] = useState(session)
  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [results, setResults] = useState([])
  const [done, setDone] = useState(session.length === 0)
  const total = session.length

  const wordId = queue[pos]
  const word = wordId ? getWord(wordId) : null

  useEffect(() => {
    setFlipped(false)
    if (word && state.settings.autoPlayAudio) {
      const t = setTimeout(() => speakArabic(word.ar), 300)
      return () => clearTimeout(t)
    }
  }, [pos, wordId])

  const grade = (quality) => {
    if (!word) return
    const res = [...results, { wordId, quality }]
    setResults(res)
    if (pos + 1 >= queue.length) {
      actions.gradeCards(res)
      setDone(true)
    } else {
      setPos((p) => p + 1)
    }
  }

  // ── Empty / completed states ──
  if (total === 0) {
    return (
      <EmptyOrDone
        title="Hammasi takrorlandi! 🎉"
        subtitle="Hozircha takrorlash uchun karta yo'q. Yangi darslarni o'rganishda davom eting."
        onHome={() => navigate('dashboard')}
        onMap={() => navigate('map')}
      />
    )
  }

  if (done) {
    const known = results.filter((r) => r.quality === 'know').length
    return (
      <div className="relative">
        <Confetti pieces={40} />
        <EmptyOrDone
          title="Takror yakunlandi! ✅"
          subtitle={`${results.length} ta kartadan ${known} tasini bildingiz.`}
          onHome={() => navigate('dashboard')}
          onMap={() => navigate('map')}
        />
      </div>
    )
  }

  const card = state.vocabulary.srsQueue[wordId] || newCard(wordId)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3">
        <button onClick={() => navigate('dashboard')} className="text-2xl text-muted">
          ✕
        </button>
        <div className="flex-1">
          <ProgressBar value={pos} max={total} color="bg-info" height="h-4" />
        </div>
        <span className="text-sm font-bold text-muted">
          {pos + 1}/{total}
        </span>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-5 pb-6">
        {/* Card */}
        <button
          onClick={() => setFlipped((f) => !f)}
          className="relative mb-6 h-80 w-full max-w-sm"
          style={{ perspective: 1000 }}
        >
          <div
            className="relative h-full w-full transition-transform duration-500"
            style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'none' }}
          >
            {/* Front (Arabic) */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-info bg-white"
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
              <p className="absolute bottom-4 text-xs text-muted">Javobni ko'rish uchun bosing</p>
            </div>
            {/* Back (meaning) */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-primary bg-primary/10"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <span className="text-7xl">{word.emoji}</span>
              <p className="text-3xl font-black text-ink">{word.uz}</p>
              <p className="text-xs text-muted">Keyingi takror: {nextReviewLabel(card)}</p>
            </div>
          </div>
        </button>

        {/* Grade buttons */}
        {flipped ? (
          <div className="flex w-full max-w-sm gap-3">
            <Button variant="danger" full size="lg" onClick={() => grade('dont')}>
              Bilmadim
            </Button>
            <Button variant="primary" full size="lg" onClick={() => grade('know')}>
              Bildim ✓
            </Button>
          </div>
        ) : (
          <Button variant="ghost" full className="max-w-sm" size="lg" onClick={() => setFlipped(true)}>
            Javobni ko'rsatish
          </Button>
        )}
      </div>
    </div>
  )
}

function EmptyOrDone({ title, subtitle, onHome, onMap }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="text-6xl">🃏</div>
      <h1 className="text-2xl font-black text-ink">{title}</h1>
      <p className="max-w-xs text-muted">{subtitle}</p>
      <div className="mt-2 w-full max-w-xs space-y-3">
        <Button full size="lg" onClick={onMap}>
          Darslarni davom ettirish
        </Button>
        <Button full variant="ghost" onClick={onHome}>
          Bosh sahifa
        </Button>
      </div>
    </div>
  )
}
