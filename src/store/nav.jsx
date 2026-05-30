import { createContext, useContext } from 'react'

// Simple view-based navigation. Views:
//   'landing' | 'dashboard' | 'map' | 'lesson' | 'results' | 'review' | 'profile' | 'settings'
export const NavContext = createContext({ view: 'landing', params: {}, navigate: () => {} })

export function useNav() {
  return useContext(NavContext)
}
