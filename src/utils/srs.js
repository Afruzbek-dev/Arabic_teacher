// Spaced Repetition System (SRS) scheduling.
// Schedule (interval in minutes):
//   new → 1min → 10min → 1d → 3d → 7d → 30d (graduated)
// "Know" advances to next interval; "Don't know" resets to step 0.

const STEPS_MIN = [1, 10, 60 * 24, 60 * 24 * 3, 60 * 24 * 7, 60 * 24 * 30]
const MIN_MS = 60 * 1000

export function newCard(wordId, now = Date.now()) {
  return {
    wordId,
    step: 0,
    reps: 0,
    ease: 2.5,
    due: now, // due immediately
    lapses: 0,
  }
}

// Grade a card. quality: 'know' | 'dont'
export function gradeCard(card, quality, now = Date.now()) {
  const c = { ...card, reps: card.reps + 1 }
  if (quality === 'know') {
    c.step = Math.min(card.step + 1, STEPS_MIN.length - 1)
    c.ease = Math.min(3.0, card.ease + 0.05)
  } else {
    c.step = 0
    c.lapses = card.lapses + 1
    c.ease = Math.max(1.3, card.ease - 0.2)
  }
  c.due = now + STEPS_MIN[c.step] * MIN_MS
  c.mastered = c.step >= STEPS_MIN.length - 1
  return c
}

// Is the card due for review?
export function isDue(card, now = Date.now()) {
  return (card?.due ?? 0) <= now
}

// Build today's review queue from the srsQueue map.
// Returns array of due cards (most overdue first), capped by `limit`.
export function dueCards(srsQueue = {}, now = Date.now(), limit = 30) {
  return Object.values(srsQueue)
    .filter((c) => isDue(c, now))
    .sort((a, b) => a.due - b.due)
    .slice(0, limit)
}

export function dueCount(srsQueue = {}, now = Date.now()) {
  return Object.values(srsQueue).filter((c) => isDue(c, now)).length
}

// Human-readable next-review label.
export function nextReviewLabel(card, now = Date.now()) {
  const diff = (card?.due ?? now) - now
  if (diff <= 0) return 'hozir'
  const min = Math.round(diff / MIN_MS)
  if (min < 60) return `${min} daqiqa`
  const hours = Math.round(min / 60)
  if (hours < 24) return `${hours} soat`
  const days = Math.round(hours / 24)
  return `${days} kun`
}

export const SRS_STEPS = STEPS_MIN
