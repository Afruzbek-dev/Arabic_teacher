// Telegram Mini App (WebApp) authentication integration.
// When the app runs inside Telegram, we use WebApp.initData to authenticate
// the user with our backend, which validates the data and returns a Firebase
// custom token for seamless sign-in.

// ── Telegram WebApp SDK ─────────────────────────────────
// The SDK is loaded via <script> in index.html (telegram-web-app.js).
// It exposes window.Telegram.WebApp.

export function isTelegramMiniApp() {
  return !!(
    typeof window !== 'undefined' &&
    window.Telegram &&
    window.Telegram.WebApp &&
    window.Telegram.WebApp.initData
  )
}

export function getTelegramWebApp() {
  if (!isTelegramMiniApp()) return null
  return window.Telegram.WebApp
}

export function getTelegramUser() {
  const wa = getTelegramWebApp()
  if (!wa || !wa.initDataUnsafe?.user) return null
  return wa.initDataUnsafe.user
}

export function getTelegramInitData() {
  const wa = getTelegramWebApp()
  if (!wa) return null
  return wa.initData // the raw query string for backend validation
}

// Signal to Telegram that the app is ready
export function telegramReady() {
  const wa = getTelegramWebApp()
  if (wa) {
    wa.ready()
    wa.expand() // expand to full screen
    // Apply Telegram theme colors
    if (wa.themeParams) {
      document.documentElement.style.setProperty('--tg-bg', wa.themeParams.bg_color || '#ffffff')
    }
  }
}

// Close the mini app
export function telegramClose() {
  const wa = getTelegramWebApp()
  if (wa) wa.close()
}

// Show Telegram's native back button
export function telegramBackButton(show, onClick) {
  const wa = getTelegramWebApp()
  if (!wa || !wa.BackButton) return
  if (show) {
    wa.BackButton.show()
    wa.BackButton.onClick(onClick)
  } else {
    wa.BackButton.hide()
  }
}

// Show Telegram main button (e.g. "Darsni boshlash")
export function telegramMainButton(text, onClick, opts = {}) {
  const wa = getTelegramWebApp()
  if (!wa || !wa.MainButton) return
  wa.MainButton.setText(text)
  wa.MainButton.show()
  if (opts.color) wa.MainButton.color = opts.color
  wa.MainButton.onClick(onClick)
}

export function hideMainButton() {
  const wa = getTelegramWebApp()
  if (wa?.MainButton) wa.MainButton.hide()
}

// Haptic feedback
export function hapticFeedback(type = 'impact') {
  const wa = getTelegramWebApp()
  if (!wa?.HapticFeedback) return
  if (type === 'impact') wa.HapticFeedback.impactOccurred('medium')
  else if (type === 'success') wa.HapticFeedback.notificationOccurred('success')
  else if (type === 'error') wa.HapticFeedback.notificationOccurred('error')
}
