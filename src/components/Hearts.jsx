import React from 'react'
import { HEARTS_MAX } from '../utils/progress'

// Inline hearts display. `value` = current hearts.
export default function Hearts({ value, max = HEARTS_MAX, size = 'text-xl' }) {
  return (
    <div className={`flex items-center gap-0.5 ${size}`} aria-label={`${value} jon`}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < value ? '' : 'grayscale opacity-30'}>
          ❤️
        </span>
      ))}
    </div>
  )
}
