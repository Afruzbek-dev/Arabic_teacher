import React, { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react'
import {
  loadState,
  saveState,
  resetState,
  defaultState,
  todayStr,
  computeStreak,
  regenHearts,
  HEARTS_MAX,
} from '../utils/progress'
import { evaluateBadges } from '../data/badges'
import { newCard, gradeCard } from '../utils/srs'
import { getLessonById, flattenLessons } from '../data/curriculum'

const StoreContext = createContext(null)

// Apply once-per-load housekeeping: hearts regen + daily xp reset.
function hydrate(state) {
  const next = { ...state, user: { ...state.user }, stats: { ...state.stats } }
  const { hearts, heartsUpdatedAt } = regenHearts(next.user.hearts, next.user.heartsUpdatedAt)
  next.user.hearts = hearts
  next.user.heartsUpdatedAt = heartsUpdatedAt
  if (next.user.lastActiveDate !== todayStr()) {
    next.user.xpToday = 0
  }
  return next
}

function reducer(state, action) {
  switch (action.type) {
    case 'REPLACE':
      return action.state

    case 'ONBOARD': {
      const user = {
        ...state.user,
        name: action.name || 'Talaba',
        level: action.level || 'A1',
        onboarded: true,
      }
      return { ...state, user }
    }

    case 'SET_CURRENT_LESSON':
      return { ...state, user: { ...state.user, currentLessonId: action.lessonId } }

    case 'LOSE_HEART': {
      const hearts = Math.max(0, state.user.hearts - 1)
      return {
        ...state,
        user: { ...state.user, hearts, heartsUpdatedAt: hearts >= HEARTS_MAX ? Date.now() : state.user.heartsUpdatedAt },
      }
    }

    case 'REFILL_HEARTS': {
      if (state.user.gems < action.cost) return state
      return {
        ...state,
        user: {
          ...state.user,
          gems: state.user.gems - action.cost,
          hearts: HEARTS_MAX,
          heartsUpdatedAt: Date.now(),
        },
      }
    }

    case 'REGEN_HEARTS': {
      const { hearts, heartsUpdatedAt } = regenHearts(state.user.hearts, state.user.heartsUpdatedAt)
      if (hearts === state.user.hearts) return state
      return { ...state, user: { ...state.user, hearts, heartsUpdatedAt } }
    }

    case 'LEARN_WORDS': {
      const known = new Set(state.vocabulary.knownWords)
      const srs = { ...state.vocabulary.srsQueue }
      for (const id of action.wordIds) {
        known.add(id)
        if (!srs[id]) srs[id] = newCard(id)
      }
      const vocabulary = { knownWords: [...known], srsQueue: srs }
      return { ...state, vocabulary }
    }

    case 'GRADE_CARDS': {
      // action.results: [{ wordId, quality }]
      const srs = { ...state.vocabulary.srsQueue }
      const known = new Set(state.vocabulary.knownWords)
      for (const { wordId, quality } of action.results) {
        const card = srs[wordId] || newCard(wordId)
        srs[wordId] = gradeCard(card, quality)
        known.add(wordId)
      }
      return {
        ...state,
        vocabulary: { knownWords: [...known], srsQueue: srs },
      }
    }

    case 'COMPLETE_LESSON': {
      const {
        lessonId,
        accuracy, // 0..100
        stars,
        xpGained,
        skillCounts = {},
        learnedWordIds = [],
      } = action.result

      const today = todayStr()
      // streak
      const streak = computeStreak(state.user.lastActiveDate, state.user.streakDays)

      // progress
      const completed = new Set(state.progress.completedLessons)
      const wasNew = !completed.has(lessonId)
      completed.add(lessonId)
      const mastered = new Set(state.progress.masteredLessons)
      if (stars >= 3) mastered.add(lessonId)

      const lessonScores = {
        ...state.progress.lessonScores,
        [lessonId]: { accuracy, stars, date: today, xp: xpGained },
      }

      // vocab
      const known = new Set(state.vocabulary.knownWords)
      const srs = { ...state.vocabulary.srsQueue }
      for (const id of learnedWordIds) {
        known.add(id)
        if (!srs[id]) srs[id] = newCard(id)
      }

      // gems: 5 for perfect, 2 otherwise
      const gemGain = accuracy >= 100 ? 5 : 2

      // stats
      const xpHistory = { ...state.stats.xpHistory }
      xpHistory[today] = (xpHistory[today] || 0) + xpGained
      const skill = { ...state.stats.skillCounts }
      for (const k of Object.keys(skillCounts)) {
        skill[k] = (skill[k] || 0) + skillCounts[k]
      }

      // next lesson id
      const all = flattenLessons()
      const idx = all.findIndex((l) => l.id === lessonId)
      const nextLesson = idx >= 0 && idx + 1 < all.length ? all[idx + 1] : null

      let next = {
        ...state,
        user: {
          ...state.user,
          xpTotal: state.user.xpTotal + xpGained,
          xpToday: state.user.xpToday + xpGained,
          gems: state.user.gems + gemGain,
          streakDays: streak.streakDays,
          lastActiveDate: streak.lastActiveDate,
          currentLessonId: nextLesson ? nextLesson.id : state.user.currentLessonId,
        },
        progress: {
          completedLessons: [...completed],
          masteredLessons: [...mastered],
          lessonScores,
        },
        vocabulary: { knownWords: [...known], srsQueue: srs },
        stats: {
          ...state.stats,
          lessonsDone: state.stats.lessonsDone + (wasNew ? 1 : 0),
          xpHistory,
          skillCounts: skill,
        },
      }

      // badges
      const newly = evaluateBadges(next)
      if (newly.length) {
        next = { ...next, user: { ...next.user, badges: [...next.user.badges, ...newly] } }
      }
      next._lastBadges = newly
      return next
    }

    case 'CLEAR_LAST_BADGES':
      return { ...state, _lastBadges: [] }

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.patch } }

    case 'ADD_GEMS':
      return { ...state, user: { ...state.user, gems: state.user.gems + action.amount } }

    case 'RESET':
      return defaultState()

    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => hydrate(loadState()))
  const saveTimer = useRef(null)

  // Persist (debounced) on every change.
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      const { _lastBadges, ...persist } = state
      saveState(persist)
    }, 150)
    return () => saveTimer.current && clearTimeout(saveTimer.current)
  }, [state])

  // Periodic heart regen check.
  useEffect(() => {
    const t = setInterval(() => dispatch({ type: 'REGEN_HEARTS' }), 60 * 1000)
    return () => clearInterval(t)
  }, [])

  const actions = useMemo(
    () => ({
      onboard: (name, level) => dispatch({ type: 'ONBOARD', name, level }),
      setCurrentLesson: (lessonId) => dispatch({ type: 'SET_CURRENT_LESSON', lessonId }),
      loseHeart: () => dispatch({ type: 'LOSE_HEART' }),
      refillHearts: (cost = 30) => dispatch({ type: 'REFILL_HEARTS', cost }),
      learnWords: (wordIds) => dispatch({ type: 'LEARN_WORDS', wordIds }),
      gradeCards: (results) => dispatch({ type: 'GRADE_CARDS', results }),
      completeLesson: (result) => dispatch({ type: 'COMPLETE_LESSON', result }),
      clearLastBadges: () => dispatch({ type: 'CLEAR_LAST_BADGES' }),
      updateSettings: (patch) => dispatch({ type: 'UPDATE_SETTINGS', patch }),
      addGems: (amount) => dispatch({ type: 'ADD_GEMS', amount }),
      reset: () => {
        resetState()
        dispatch({ type: 'RESET' })
      },
    }),
    [],
  )

  const value = useMemo(() => ({ state, actions }), [state, actions])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}

// Convenience: derive the "next available" lesson for resume.
export function useResumeLesson() {
  const { state } = useStore()
  const all = flattenLessons()
  if (state.user.currentLessonId) {
    const found = getLessonById(state.user.currentLessonId)
    if (found) return found
  }
  // first not-completed
  const done = new Set(state.progress.completedLessons)
  return all.find((l) => !done.has(l.id)) || all[0]
}
