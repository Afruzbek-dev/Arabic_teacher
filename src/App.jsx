import React, { useEffect, useMemo, useState } from 'react'
import { StoreProvider, useStore } from './store/AppStore'
import { NavContext } from './store/nav'
import { BadgeToast } from './components/BadgeSystem'
import { AuthProvider, useAuth } from './auth/AuthContext'

import AuthScreen from './components/AuthScreen'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import LessonMap from './components/LessonMap'
import LessonPlayer from './components/LessonPlayer'
import ResultsScreen from './components/ResultsScreen'
import VocabReview from './components/VocabReview'
import Profile from './components/Profile'
import Settings from './components/Settings'
import BottomNav from './components/BottomNav'

const TABBED_VIEWS = new Set(['dashboard', 'map', 'review', 'profile'])

function AuthGate({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="app-frame shadow-2xl">
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="font-bold text-muted">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="app-frame shadow-2xl">
        <AuthScreen />
      </div>
    )
  }

  return children
}

function Shell() {
  const { state, actions } = useStore()
  const [view, setView] = useState(state.user.onboarded ? 'dashboard' : 'landing')
  const [params, setParams] = useState({})
  const [transitioning, setTransitioning] = useState(false)

  const navigate = useMemo(
    () => (nextView, nextParams = {}) => {
      if (nextView === 'lesson' && !nextParams.lessonId) {
        nextView = 'map'
        nextParams = {}
      }
      setTransitioning(true)
      setTimeout(() => {
        setView(nextView)
        setParams(nextParams)
        setTransitioning(false)
        const main = document.getElementById('app-main')
        if (main) main.scrollTo({ top: 0 })
      }, 120)
    },
    [],
  )

  useEffect(() => {
    if (!state.user.onboarded && view !== 'landing') setView('landing')
  }, [state.user.onboarded, view])

  const navValue = useMemo(() => ({ view, params, navigate }), [view, params, navigate])
  const showTabs = TABBED_VIEWS.has(view)

  let screen = null
  switch (view) {
    case 'landing': screen = <LandingPage />; break
    case 'dashboard': screen = <Dashboard />; break
    case 'map': screen = <LessonMap />; break
    case 'lesson': screen = <LessonPlayer key={params.lessonId} lessonId={params.lessonId} />; break
    case 'results': screen = <ResultsScreen result={params.result} lessonId={params.lessonId} />; break
    case 'review': screen = <VocabReview />; break
    case 'profile': screen = <Profile />; break
    case 'settings': screen = <Settings />; break
    default: screen = <Dashboard />
  }

  return (
    <NavContext.Provider value={navValue}>
      <div className="app-frame shadow-2xl">
        <main
          id="app-main"
          className={`flex-1 overflow-y-auto no-scrollbar ${transitioning ? 'opacity-0' : 'animate-fadeIn'} transition-opacity duration-150`}
        >
          {screen}
        </main>
        {showTabs && <BottomNav />}
        <BadgeToast badgeIds={state._lastBadges || []} onClose={actions.clearLastBadges} />
      </div>
    </NavContext.Provider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <AuthGate>
          <Shell />
        </AuthGate>
      </StoreProvider>
    </AuthProvider>
  )
}
