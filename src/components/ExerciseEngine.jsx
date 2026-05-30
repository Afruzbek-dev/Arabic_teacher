import React from 'react'
import VocabFlashcard from './exercises/VocabFlashcard'
import GrammarCard from './exercises/GrammarCard'
import ReadingPassage from './exercises/ReadingPassage'
import LetterCard from './exercises/LetterCard'
import TracingPad from './exercises/TracingPad'
import SpeakingExercise from './exercises/SpeakingExercise'
import WritingPad from './exercises/WritingPad'
import QuizEngine from './exercises/QuizEngine'
import { arabicSimilarity } from '../utils/scoring'

// Decide if a graded step's selected answer is correct.
export function isStepCorrect(step, selected) {
  if (!step.graded) return true
  switch (step.kind) {
    case 'mcq':
      return selected === step.answer
    case 'speak':
      return !!(selected && selected.passed)
    case 'writing':
      return arabicSimilarity(selected || '', step.data.word.ar) >= 80
    default:
      return true
  }
}

// Is the current selection sufficient to allow "Check"?
export function canCheck(step, selected) {
  if (!step.graded) return true
  switch (step.kind) {
    case 'mcq':
      return selected != null
    case 'speak':
      return selected != null
    case 'writing':
      return !!(selected && selected.trim().length > 0)
    default:
      return true
  }
}

// Render the exercise for the given step.
export default function ExerciseEngine({ step, selected, setSelected, checked, correct }) {
  const props = { step, selected, setSelected, checked, correct }
  switch (step.kind) {
    case 'flashcard':
      return <VocabFlashcard {...props} />
    case 'grammarCard':
      return <GrammarCard {...props} />
    case 'readingIntro':
      return <ReadingPassage {...props} />
    case 'letterIntro':
      return <LetterCard {...props} />
    case 'tracing':
      return <TracingPad {...props} />
    case 'speak':
      return <SpeakingExercise {...props} />
    case 'writing':
      return <WritingPad {...props} />
    case 'mcq':
      return <QuizEngine {...props} />
    default:
      return <div className="text-center text-muted">Noma'lum mashq turi: {step.kind}</div>
  }
}
