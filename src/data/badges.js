// Badge / achievement definitions.
// `check(state)` returns true if the badge should be unlocked.

export const BADGES = [
  {
    id: 'first_lesson',
    title: 'Birinchi qadam',
    desc: 'Birinchi darsni tamomlang',
    icon: '🌱',
    check: (s) => s.progress.completedLessons.length >= 1,
  },
  {
    id: 'vocab_10',
    title: 'So\'z yig\'uvchi',
    desc: '10 ta so\'z o\'rganing',
    icon: '🔤',
    check: (s) => s.vocabulary.knownWords.length >= 10,
  },
  {
    id: 'vocab_50',
    title: 'So\'z ustasi',
    desc: '50 ta so\'z o\'rganing',
    icon: '📚',
    check: (s) => s.vocabulary.knownWords.length >= 50,
  },
  {
    id: 'streak_3',
    title: '3 kunlik olov',
    desc: '3 kun ketma-ket shug\'ullaning',
    icon: '🔥',
    check: (s) => s.user.streakDays >= 3,
  },
  {
    id: 'streak_7',
    title: 'Haftalik chempion',
    desc: '7 kunlik streak',
    icon: '🏆',
    check: (s) => s.user.streakDays >= 7,
  },
  {
    id: 'perfect_lesson',
    title: 'Mukammal',
    desc: 'Bir darsni 100% bajaring',
    icon: '⭐',
    check: (s) => Object.values(s.progress.lessonScores).some((r) => r.accuracy >= 100),
  },
  {
    id: 'xp_100',
    title: 'Yuz ball',
    desc: '100 XP to\'plang',
    icon: '⚡',
    check: (s) => s.user.xpTotal >= 100,
  },
  {
    id: 'xp_500',
    title: 'Besh yuz ball',
    desc: '500 XP to\'plang',
    icon: '💪',
    check: (s) => s.user.xpTotal >= 500,
  },
  {
    id: 'level_a2',
    title: 'A1 bitiruvchi',
    desc: 'Barcha A1 darslarini tugating',
    icon: '🎓',
    check: (s) => {
      // unlocked when at least 7 A1 lessons completed
      const a1Done = s.progress.completedLessons.filter((id) => id.startsWith('A1')).length
      return a1Done >= 7
    },
  },
  {
    id: 'gems_50',
    title: 'Xazinador',
    desc: '50 ta gavhar to\'plang',
    icon: '💎',
    check: (s) => s.user.gems >= 50,
  },
]

export function evaluateBadges(state) {
  const have = new Set(state.user.badges)
  const newly = []
  for (const b of BADGES) {
    if (!have.has(b.id) && b.check(state)) newly.push(b.id)
  }
  return newly
}

export function getBadge(id) {
  return BADGES.find((b) => b.id === id)
}
