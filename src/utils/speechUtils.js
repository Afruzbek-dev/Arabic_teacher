// Web Speech API wrappers: text-to-speech (TTS) + speech recognition.
// All functions degrade gracefully when the API is unavailable.

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

// Speak Arabic text. rate ~0.8 by default for learners.
export function speakArabic(text, { rate = 0.8, pitch = 1, onEnd } = {}) {
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
    window.speechSynthesis.speak(u)
  } catch (e) {
    console.warn('TTS failed', e)
    onEnd?.()
  }
}

export function stopSpeaking() {
  if (ttsSupported()) {
    try {
      window.speechSynthesis.cancel()
    } catch (e) {
      // ignore
    }
  }
}

// ── Speech recognition ──────────────────────────────────
export function recognitionSupported() {
  return (
    typeof window !== 'undefined' &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition)
  )
}

// Start listening for Arabic speech.
// Returns the recognition instance (call .abort() to cancel) or null.
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
