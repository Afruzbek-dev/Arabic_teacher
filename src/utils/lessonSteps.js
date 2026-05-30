// Build an ordered list of exercise steps from a lesson definition.
// Each step: { kind, skill, graded, prompt, data, answer }
import { getWords, distractors, VOCAB } from '../data/vocabulary'
import { getGrammar } from '../data/grammar'
import { getPassage } from '../data/sentences'
import { LETTERS } from '../data/curriculum'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function pick(arr, n) {
  return shuffle(arr).slice(0, n)
}

// MCQ helper: build options array of {label, value, ar} with one correct.
function mcqOptions(correct, pool, render) {
  const opts = [correct, ...pool].map(render)
  return shuffle(opts)
}

export function buildLessonSteps(lesson) {
  if (!lesson) return []
  if (lesson.type === 'alphabet') return buildAlphabetSteps(lesson)
  return buildStandardSteps(lesson)
}

function buildAlphabetSteps(lesson) {
  const letters = (lesson.letters || []).map((ch) => LETTERS.find((l) => l.ar === ch)).filter(Boolean)
  const steps = []

  // Intro each letter
  for (const l of letters) {
    steps.push({
      kind: 'letterIntro',
      skill: null,
      graded: false,
      prompt: 'Yangi harf',
      data: { letter: l },
    })
  }

  // Recognition MCQ: show letter, choose name
  for (const l of pick(letters, Math.min(letters.length, 5))) {
    const others = pick(LETTERS.filter((x) => x.ar !== l.ar), 3)
    steps.push({
      kind: 'mcq',
      skill: 'reading',
      graded: true,
      prompt: 'Bu harf nomi nima?',
      data: {
        headerAr: l.ar,
        optionType: 'text',
        options: shuffle([l.name, ...others.map((o) => o.name)]),
      },
      answer: l.name,
    })
  }

  // Listening: hear letter, pick it
  for (const l of pick(letters, Math.min(letters.length, 3))) {
    const others = pick(LETTERS.filter((x) => x.ar !== l.ar), 3)
    steps.push({
      kind: 'mcq',
      skill: 'listening',
      graded: true,
      prompt: 'Tinglang va to\'g\'ri harfni tanlang',
      data: {
        audio: l.ar,
        optionType: 'ar',
        options: shuffle([l.ar, ...others.map((o) => o.ar)]),
      },
      answer: l.ar,
    })
  }

  // Tracing
  for (const l of pick(letters, Math.min(letters.length, 2))) {
    steps.push({
      kind: 'tracing',
      skill: 'writing',
      graded: false,
      prompt: 'Harfni chizib mashq qiling',
      data: { letter: l },
    })
  }

  return steps
}

function buildStandardSteps(lesson) {
  const words = getWords(lesson.vocabIds || [])
  const grammar = getGrammar(lesson.grammarId)
  const passage = getPassage(lesson.readingId)
  const steps = []
  const skills = lesson.skills || []

  // 1. Vocab intro
  if (skills.includes('vocab')) {
    for (const w of words) {
      steps.push({ kind: 'flashcard', skill: null, graded: false, prompt: 'Yangi so\'z', data: { word: w } })
    }
  }

  // 2. Recognition (Arabic -> Uzbek meaning)
  if (skills.includes('recognition')) {
    for (const w of words) {
      const ds = distractors(w.id, 3, words.length >= 4 ? words : VOCAB)
      steps.push({
        kind: 'mcq',
        skill: 'reading',
        graded: true,
        prompt: 'Ushbu so\'z ma\'nosini tanlang',
        data: {
          headerAr: w.ar,
          translit: w.translit,
          optionType: 'text',
          options: shuffle([w.uz, ...ds.map((d) => d.uz)]),
        },
        answer: w.uz,
      })
    }
  }

  // 3. Listening (hear word, pick Arabic) — for a few words
  if (skills.includes('listening')) {
    for (const w of pick(words, Math.min(words.length, 3))) {
      const ds = distractors(w.id, 3, words.length >= 4 ? words : VOCAB)
      steps.push({
        kind: 'mcq',
        skill: 'listening',
        graded: true,
        prompt: 'Tinglang: qaysi so\'z eshitildi?',
        data: {
          audio: w.ar,
          optionType: 'ar',
          options: shuffle([w.ar, ...ds.map((d) => d.ar)]),
        },
        answer: w.ar,
      })
    }
  }

  // 4. Grammar card + fill-in-the-blank
  if (skills.includes('grammar') && grammar) {
    steps.push({ kind: 'grammarCard', skill: null, graded: false, prompt: 'Grammatika', data: { grammar } })
    for (const b of grammar.blanks || []) {
      steps.push({
        kind: 'mcq',
        skill: 'reading',
        graded: true,
        prompt: b.prompt,
        data: {
          headerAr: b.sentence,
          optionType: 'ar',
          options: shuffle([...b.options]),
          explanation: b.uz,
        },
        answer: b.answer,
      })
    }
  }

  // 5. Reading passage + comprehension
  if (skills.includes('reading') && passage) {
    steps.push({ kind: 'readingIntro', skill: 'reading', graded: false, prompt: 'O\'qing', data: { passage } })
    for (const q of passage.questions || []) {
      steps.push({
        kind: 'mcq',
        skill: 'reading',
        graded: true,
        prompt: q.q,
        data: { optionType: 'text', options: shuffle([...q.options]) },
        answer: q.answer,
      })
    }
  }

  // 6. Speaking
  if (skills.includes('speaking')) {
    for (const w of pick(words, Math.min(words.length, 2))) {
      steps.push({
        kind: 'speak',
        skill: 'speaking',
        graded: true,
        prompt: 'Eshiting va takrorlang',
        data: { word: w },
      })
    }
  }

  // 7. Writing (unscramble letters to form the word)
  if (skills.includes('writing')) {
    for (const w of pick(words, Math.min(words.length, 2))) {
      steps.push({
        kind: 'writing',
        skill: 'writing',
        graded: true,
        prompt: 'So\'zni yozing',
        data: { word: w },
      })
    }
  }

  // 8. Final quiz (mixed Uzbek -> Arabic)
  if (skills.includes('quiz')) {
    for (const w of pick(words, Math.min(words.length, 5))) {
      const ds = distractors(w.id, 3, words.length >= 4 ? words : VOCAB)
      steps.push({
        kind: 'mcq',
        skill: 'reading',
        graded: true,
        prompt: `"${w.uz}" — arabchasi qaysi?`,
        data: {
          optionType: 'ar',
          options: shuffle([w.ar, ...ds.map((d) => d.ar)]),
        },
        answer: w.ar,
      })
    }
  }

  return steps
}
