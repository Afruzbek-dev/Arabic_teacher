// ═══════════════════════════════════════════════════════════════════════
// Arabic Audio System — Multi-source TTS with caching & preloading
// Sources (in priority order):
//   1. Lingva Translate API (proxied Google Neural TTS — open source, no API key)
//   2. Browser Web Speech API (fallback)
// ═══════════════════════════════════════════════════════════════════════

// ── Lingva TTS instances (public, open-source) ─────────────────────────
// These are open-source instances of lingva-translate that expose a
// GET /api/v1/audio/:lang/:text endpoint returning MP3/OGG audio.
const LINGVA_INSTANCES = [
  'https://lingva.ml',
  'https://lingva.thedaviddelta.com',
  'https://translate.plausibility.cloud',
]

// ── Audio cache (in-memory, persists for session) ───────────────────────
const audioCache = new Map() // key: text → value: Blob URL
const pendingFetches = new Map() // key: text → value: Promise<string|null>
const MAX_CACHE = 500

// ── Configuration ──────────────────────────────────────────────────────
let preferredSource = 'lingva' // 'lingva' | 'web-speech'
let lingvaAvailable = null // null = untested, true/false after first attempt

// ── Public API ──────────────────────────────────────────────────────────

/**
 * Speak Arabic text using the best available source.
 * Returns a Promise that resolves when playback ends (or immediately on failure).
 */
export async function speakArabic(text, { rate = 0.8, pitch = 1, onEnd } = {}) {
  if (!text || typeof window === 'undefined') {
    onEnd?.()
    return
  }

  // Try Lingva audio first (cached or fetched)
  if (preferredSource === 'lingva' && lingvaAvailable !== false) {
    const played = await playLingvaAudio(text, rate)
    if (played) {
      onEnd?.()
      return
    }
    // If lingva failed, mark it unavailable and fall through
    lingvaAvailable = false
  }

  // Fallback: Web Speech API
  speakWithWebSpeech(text, { rate, pitch, onEnd })
}

/**
 * Preload audio for an array of Arabic texts (fire-and-forget).
 * Call this when entering a lesson to warm the cache.
 */
export function preloadAudio(texts = []) {
  for (const text of texts) {
    if (!text || audioCache.has(text)) continue
    fetchLingvaAudio(text) // don't await — background fetch
  }
}

/**
 * Check if audio is cached for a given text.
 */
export function isAudioCached(text) {
  return audioCache.has(text)
}

/**
 * Get current audio source status.
 */
export function getAudioStatus() {
  return {
    source: lingvaAvailable === false ? 'web-speech' : 'lingva',
    lingvaAvailable,
    cachedCount: audioCache.size,
    webSpeechSupported: ttsSupported(),
    hasArabicVoice: hasArabicVoice(),
  }
}

/**
 * Stop any currently playing audio.
 */
export function stopSpeaking() {
  // Stop any HTML5 audio elements we created
  const existing = document.querySelectorAll('audio[data-arabic-tts]')
  existing.forEach((el) => {
    el.pause()
    el.remove()
  })
  // Stop Web Speech API
  if (ttsSupported()) {
    try {
      window.speechSynthesis.cancel()
    } catch (e) { /* ignore */ }
  }
}

// ── Lingva Audio (primary source) ──────────────────────────────────────

async function fetchLingvaAudio(text) {
  // Dedup concurrent fetches for the same text
  if (pendingFetches.has(text)) return pendingFetches.get(text)
  if (audioCache.has(text)) return audioCache.get(text)

  const promise = (async () => {
    const encoded = encodeURIComponent(text)
    for (const instance of LINGVA_INSTANCES) {
      try {
        const url = `${instance}/api/v1/audio/ar/${encoded}`
        const res = await fetch(url, {
          signal: AbortSignal.timeout(6000), // 6s timeout per instance
        })
        if (!res.ok) continue
        const blob = await res.blob()
        if (blob.size < 100) continue // too small = error response

        const blobUrl = URL.createObjectURL(blob)

        // Manage cache size
        if (audioCache.size >= MAX_CACHE) {
          const firstKey = audioCache.keys().next().value
          const oldUrl = audioCache.get(firstKey)
          URL.revokeObjectURL(oldUrl)
          audioCache.delete(firstKey)
        }

        audioCache.set(text, blobUrl)
        lingvaAvailable = true
        return blobUrl
      } catch (e) {
        // Try next instance
        continue
      }
    }
    return null
  })()

  pendingFetches.set(text, promise)
  const result = await promise
  pendingFetches.delete(text)
  return result
}

async function playLingvaAudio(text, rate = 0.8) {
  try {
    let blobUrl = audioCache.get(text) || (await fetchLingvaAudio(text))
    if (!blobUrl) return false

    return new Promise((resolve) => {
      const audio = new Audio(blobUrl)
      audio.setAttribute('data-arabic-tts', 'true')
      audio.playbackRate = Math.max(0.5, Math.min(2, rate / 0.8)) // normalize: 0.8 = normal
      audio.onended = () => {
        audio.remove()
        resolve(true)
      }
      audio.onerror = () => {
        audio.remove()
        resolve(false)
      }
      // Timeout safety — if audio doesn't end in 15s, resolve anyway
      setTimeout(() => {
        audio.pause()
        audio.remove()
        resolve(true)
      }, 15000)
      audio.play().catch(() => resolve(false))
    })
  } catch (e) {
    return false
  }
}

// ── Web Speech API (fallback) ──────────────────────────────────────────

let cachedVoices = null

function loadVoices() {
  if (!('speechSynthesis' in window)) return []
  const v = window.speechSynthesis.getVoices()
  if (v && v.length) cachedVoices = v
  return cachedVoices || []
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices()
  window.speechSynthesis.onvoiceschanged = loadVoices
}

export function ttsSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function pickArabicVoice() {
  const voices = loadVoices()
  if (!voices.length) return null
  return (
    voices.find((v) => v.lang === 'ar-SA') ||
    voices.find((v) => v.lang && v.lang.startsWith('ar')) ||
    null
  )
}

export function hasArabicVoice() {
  return !!pickArabicVoice()
}

function speakWithWebSpeech(text, { rate = 0.8, pitch = 1, onEnd } = {}) {
  if (!ttsSupported() || !text) {
    onEnd?.()
    return
  }
  try {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'ar-SA'
    u.rate = rate
    u.pitch = pitch
    const voice = pickArabicVoice()
    if (voice) u.voice = voice
    if (onEnd) u.onend = onEnd
    u.onerror = () => onEnd?.()
    window.speechSynthesis.speak(u)
  } catch (e) {
    console.warn('Web Speech TTS failed', e)
    onEnd?.()
  }
}

// ── Speech recognition (unchanged) ─────────────────────────────────────

export function recognitionSupported() {
  return (
    typeof window !== 'undefined' &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition)
  )
}

/**
 * Start listening for Arabic speech.
 * Returns the recognition instance (call .abort() to cancel) or null.
 */
export function listenForArabic({ onResult, onError, onEnd } = {}) {
  if (!recognitionSupported()) {
    onError?.('unsupported')
    return null
  }
  try {
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition
    const rec = new Rec()
    rec.lang = 'ar-SA'
    rec.interimResults = false
    rec.maxAlternatives = 3
    rec.continuous = false
    rec.onresult = (e) => {
      const alts = []
      for (let i = 0; i < e.results[0].length; i++) {
        alts.push(e.results[0][i].transcript)
      }
      onResult?.(alts[0], alts)
    }
    rec.onerror = (e) => onError?.(e.error || 'error')
    rec.onend = () => onEnd?.()
    rec.start()
    return rec
  } catch (e) {
    onError?.(String(e))
    return null
  }
}
