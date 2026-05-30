// XP, accuracy, and stars calculation.

export const XP_RULES = {
  lessonComplete: 10,
  perfectScore: 25,
  firstTryBonus: 5,
}

export function streakBonus(streakDays) {
  return Math.min(streakDays, 30) * 5
}

// Stars from accuracy (0..1)
export function starsFromAccuracy(accuracy) {
  if (accuracy >= 0.95) return 3
  if (accuracy >= 0.75) return 2
  if (accuracy >= 0.5) return 1
  return 0
}

// Compute lesson XP given results.
// results: { total, correct, firstTryCorrect, perfect, streakDays }
export function computeLessonXP({ baseXP = 10, correct, total, perfect, streakDays = 0 }) {
  let xp = baseXP
  if (perfect) xp += XP_RULES.perfectScore
  // bonus proportional to accuracy
  const accuracy = total > 0 ? correct / total : 0
  xp += Math.round(accuracy * 10)
  xp += streakBonus(streakDays) > 0 ? 0 : 0 // streak handled at app level
  return Math.max(0, xp)
}

export function accuracyPct(correct, total) {
  if (!total) return 0
  return Math.round((correct / total) * 100)
}

// Phonetic similarity for speaking exercises (normalized 0..100).
// Strips harakat & punctuation, then uses a Levenshtein-based ratio.
export function arabicSimilarity(a = '', b = '') {
  const norm = (s) =>
    s
      .replace(/[\u064B-\u065F\u0670]/g, '') // harakat / tanwin / dagger alif
      .replace(/[إأآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/[^\u0600-\u06FF]/g, '')
      .trim()
  const x = norm(a)
  const y = norm(b)
  if (!x && !y) return 100
  if (!x || !y) return 0
  const dist = levenshtein(x, y)
  const maxLen = Math.max(x.length, y.length)
  return Math.max(0, Math.round((1 - dist / maxLen) * 100))
}

function levenshtein(a, b) {
  const m = a.length
  const n = b.length
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)])
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
    }
  }
  return dp[m][n]
}
