# Arab Akademiya — Arabic Language Learning App

A production-grade, mobile-first single-page web app that teaches Arabic from **A1 to C2** using an **Al-Manhaj** and **At-Takallum** based curriculum. The UX is inspired by Duolingo: a gamified lesson path, XP, hearts, streaks, badges, gems, and spaced-repetition vocabulary review.

The interface language is **Uzbek**; the learning content is **Arabic** (with full harakat/short vowels for A1–B1).

## Features

- **Curriculum (A1 → C2):** 6 levels, multiple units per level, with real Arabic content for A1, A2, and B1 lessons.
- **6 skill areas:** Reading, Writing, Listening, Speaking, Grammar, and Vocabulary.
- **Exercise types:**
  - Vocabulary flashcards (flip + audio)
  - Multiple-choice recognition (Arabic → meaning, meaning → Arabic)
  - Listening (Web Speech API TTS, with 0.5x / 1x / 1.5x speed)
  - Speaking (Web Speech API recognition with a pronunciation score)
  - Grammar rule cards + fill-in-the-blank
  - Reading passages with tap-to-reveal word meanings
  - Writing with an on-screen **virtual Arabic keyboard**
  - Letter introduction and free-form tracing pad for the alphabet
- **Gamification:** XP & daily goal, 5-heart system with timed regen, streak tracking with milestones, gems, and an achievement/badge system.
- **Spaced Repetition System (SRS):** graduating intervals (1m → 10m → 1d → 3d → 7d → 30d) for long-term retention.
- **Persistence:** all progress is saved to `localStorage`.
- **Design:** mobile-first (centered 480px frame), RTL Arabic layout, smooth transitions, confetti on completion.

## Tech Stack

- [React 18](https://react.dev/) (functional components + hooks)
- [Vite](https://vite.dev/) (dev server + build)
- [Tailwind CSS](https://tailwindcss.com/)
- Web Speech API (TTS + speech recognition)
- No backend — fully client-side, data is bundled inline

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
├── App.jsx                 # Root shell + view routing
├── main.jsx                # React entry
├── index.css               # Tailwind + global styles
├── components/
│   ├── LandingPage.jsx     # Onboarding (level + name)
│   ├── Dashboard.jsx       # Home: streak, XP goal, skills, resume
│   ├── LessonMap.jsx       # Duolingo-style lesson path
│   ├── LessonPlayer.jsx    # Lesson orchestrator (scoring, hearts)
│   ├── ExerciseEngine.jsx  # Exercise dispatcher + answer validation
│   ├── ResultsScreen.jsx   # XP count-up, accuracy gauge, confetti
│   ├── VocabReview.jsx     # SRS flashcard review
│   ├── Profile.jsx         # Stats, 7-day XP chart, badges
│   ├── Settings.jsx        # Goals, toggles, reset
│   ├── ArabicKeyboard.jsx  # On-screen Arabic keyboard
│   ├── TopBar / BottomNav / XPBar / StreakCounter / Hearts / BadgeSystem
│   └── exercises/          # VocabFlashcard, GrammarCard, QuizEngine,
│                           # ReadingPassage, SpeakingExercise, WritingPad,
│                           # LetterCard, TracingPad
├── data/
│   ├── curriculum.js       # Levels, units, lessons, letters
│   ├── vocabulary.js       # 90+ words with harakat, Uzbek, translit, emoji
│   ├── grammar.js          # Grammar rules + fill-in-the-blank
│   ├── sentences.js        # Reading/listening passages + questions
│   └── badges.js           # Achievement definitions
├── store/
│   ├── AppStore.jsx        # Global state (reducer) + localStorage
│   └── nav.jsx             # View navigation context
└── utils/
    ├── progress.js         # localStorage, streak, hearts regen
    ├── scoring.js          # XP, accuracy, stars, phonetic similarity
    ├── srs.js              # Spaced repetition scheduling
    ├── speechUtils.js      # Web Speech API (TTS + recognition)
    └── lessonSteps.js      # Builds exercise sequence from a lesson

```

## Notes

- **Audio & speech recognition** rely on the browser's Web Speech API. Availability of an Arabic voice and microphone-based recognition varies by browser/OS (best support in Chrome). The app degrades gracefully when a feature is unavailable (see Settings → "Qurilma imkoniyatlari").
- Levels **B2, C1, and C2** are scaffolded in the curriculum with unit titles; their lessons are marked "coming soon" and can be filled in using the same data structures.
