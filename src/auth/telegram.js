/**
 * Telegram Mini App utilities.
 * Detects Telegram environment, extracts user data, provides UI helpers.
 */

export function isTelegramMiniApp() {
  return !!(
    typeof window !== 'undefined' &&
    window.Telegram &&
    window.Telegram.WebApp &&
    window.Telegram.WebApp.initData &&
    window.Telegram.WebApp.initData.length > 0
  )
}

export function getTelegramWebApp() {
  if (!window.Telegram || !window.Telegram.WebApp) return null
  return window.Telegram.WebApp
}

export function getTelegramUser() {
  const wa = getTelegramWebApp()
  if (!wa || !wa.initDataUnsafe) return null
  return wa.initDataUnsafe.user || null
}

export function getTelegramInitData() {
  const wa = getTelegramWebApp()
  if (!wa) return ''
  return wa.initData || ''
}

export function telegramReady() {
  const wa = getTelegramWebApp()
  if (wa) {
    wa.ready()
    wa.expand()
  }
}

export function telegramClose() {
  const wa = getTelegramWebApp()
  if (wa) wa.close()
}

export function hapticFeedback(type = 'impact') {
  const wa = getTelegramWebApp()
  if (!wa?.HapticFeedback) return
  if (type === 'impact') wa.HapticFeedback.impactOccurred('medium')
  else if (type === 'success') wa.HapticFeedback.notificationOccurred('success')
  else if (type === 'error') wa.HapticFeedback.notificationOccurred('error')
}
