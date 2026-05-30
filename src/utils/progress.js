// localStorage persistence helpers + default state schema.
// Sets are serialised as arrays.

const STORAGE_KEY = 'arabic-academy-state-v1'

export function todayStr(d = new Date()) {
  return d.toISOString().slice(0, 10) // YYYY-MM-DD
}

export function defaultState() {
  return {
    user: {
      name: '',
      level: 'A1',
      currentLessonId: null,
      xpTotal: 0,
      xpToday: 0,
      streakDays: 0,
      lastActiveDate: null,
      hearts: 5,
      heartsUpdatedAt: Date.now(),
      gems: 0,
      badges: [],
      onboarded: false,
    },
    progress: {
      completedLessons: [], // lesson IDs
      masteredLessons: [], // 3-star lesson IDs
      lessonScores: {}, // { lessonId: { accuracy, stars, date, xp } }
    },
    vocabulary: {
      knownWords: [], // word IDs ever learned
      srsQueue: {}, // { wordId: { interval, ease, due, reps } }
    },
    stats: {
      lessonsDone: 0,
      xpHistory: {}, // { 'YYYY-MM-DD': xp }
      skillCounts: { reading: 0, writing: 0, listening: 0, speaking: 0 },
    },
    settings: {
      dailyXPGoal: 50,
      uiLanguage: 'uz',
      autoPlayAudio: true,
      showHarakat: true,
      fontScale: 1,
      soundEffects: true,
    },
  }
}

// Deep-ish merge so new fields in defaultState appear after upgrades.
function mergeDefaults(saved) {
  const base = defaultState()
  if (!saved || typeof saved !== 'object') return base
  return {
    user: { ...base.user, ...saved.user },
    progress: { ...base.progress, ...saved.progress },
    vocabulary: { ...base.vocabulary, ...saved.vocabulary },
    stats: {
      ...base.stats,
      ...saved.stats,
      skillCounts: { ...base.stats.skillCounts, ...(saved.stats?.skillCounts || {}) },
      xpHistory: { ...(saved.stats?.xpHistory || {}) },
    },
    settings: { ...base.settings, ...saved.settings },
  }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    return mergeDefaults(JSON.parse(raw))
  } catch (e) {
    console.warn('Failed to load state, using default', e)
    return defaultState()
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('Failed to save state', e)
  }
}

export function resetState() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    console.warn('Failed to reset state', e)
  }
  return defaultState()
}

// ── Streak logic ─────────────────────────────────────────
// Returns updated streak fields given the last active date.
export function computeStreak(lastActiveDate, streakDays) {
  const today = todayStr()
  if (lastActiveDate === today) return { streakDays, lastActiveDate: today, changed: false }

  const yesterday = todayStr(new Date(Date.now() - 86400000))
  if (lastActiveDate === yesterday) {
    return { streakDays: streakDays + 1, lastActiveDate: today, changed: true }
  }
  // missed a day (or first ever) → reset to 1
  return { streakDays: 1, lastActiveDate: today, changed: true }
}

// ── Hearts regen (1 per 30 min, max 5) ──────────────────
const HEART_MAX = 5
const HEART_REGEN_MS = 30 * 60 * 1000

export function regenHearts(hearts, heartsUpdatedAt) {
  if (hearts >= HEART_MAX) return { hearts: HEART_MAX, heartsUpdatedAt: Date.now() }
  const now = Date.now()
  const elapsed = now - (heartsUpdatedAt || now)
  const gained = Math.floor(elapsed / HEART_REGEN_MS)
  if (gained <= 0) return { hearts, heartsUpdatedAt }
  const newHearts = Math.min(HEART_MAX, hearts + gained)
  // keep remainder time so partial progress isn't lost
  const consumed = gained * HEART_REGEN_MS
  return {
    hearts: newHearts,
    heartsUpdatedAt: newHearts >= HEART_MAX ? now : (heartsUpdatedAt || now) + consumed,
  }
}

export const HEARTS_MAX = HEART_MAX
