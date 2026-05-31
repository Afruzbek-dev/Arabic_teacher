/**
 * Telegram Mini App Utilities
 * 
 * Provides a clean interface to Telegram's WebApp API.
 * Used when the app is running inside Telegram as a Mini App.
 * 
 * @see https://core.telegram.org/bots/webapps
 */

/**
 * Check if the current environment is a Telegram Mini App
 * Detects presence of Telegram WebApp object and valid initData
 * @returns {boolean} True if running inside Telegram
 */
export function isTelegramMiniApp() {
  return !!(
    window.Telegram &&
    window.Telegram.WebApp &&
    window.Telegram.WebApp.initData &&
    window.Telegram.WebApp.initData.length > 0
  );
}

/**
 * Get the Telegram WebApp instance
 * @returns {object|null} Telegram WebApp object or null if not available
 */
export function getTelegramWebApp() {
  if (!window.Telegram || !window.Telegram.WebApp) return null;
  return window.Telegram.WebApp;
}

/**
 * Get the current Telegram user data
 * Contains: id, first_name, last_name, username, language_code, photo_url
 * @returns {object|null} Telegram user object or null
 */
export function getTelegramUser() {
  const webApp = getTelegramWebApp();
  if (!webApp || !webApp.initDataUnsafe) return null;
  return webApp.initDataUnsafe.user || null;
}

/**
 * Get the raw initData string for backend validation
 * This is signed by Telegram and used to verify authenticity
 * @returns {string} Raw initData query string
 */
export function getTelegramInitData() {
  const webApp = getTelegramWebApp();
  if (!webApp) return '';
  return webApp.initData || '';
}

/**
 * Signal to Telegram that the Mini App is ready to display
 * Call this after initial render to remove the loading placeholder
 */
export function telegramReady() {
  const webApp = getTelegramWebApp();
  if (webApp) {
    webApp.ready();
    // Expand the app to full height
    webApp.expand();
  }
}

/**
 * Close the Telegram Mini App
 * Returns user to the Telegram chat
 */
export function telegramClose() {
  const webApp = getTelegramWebApp();
  if (webApp) {
    webApp.close();
  }
}

/**
 * Configure and show the Telegram back button
 * @param {function} callback - Called when back button is pressed
 * @returns {function} Cleanup function to hide button and remove listener
 */
export function telegramBackButton(callback) {
  const webApp = getTelegramWebApp();
  if (!webApp || !webApp.BackButton) return () => {};

  webApp.BackButton.show();
  webApp.BackButton.onClick(callback);

  // Return cleanup function
  return () => {
    webApp.BackButton.offClick(callback);
    webApp.BackButton.hide();
  };
}

/**
 * Configure and show the Telegram main button
 * @param {string} text - Button label text
 * @param {function} callback - Called when main button is pressed
 * @param {object} options - Optional styling: { color, textColor }
 * @returns {function} Cleanup function to hide button and remove listener
 */
export function telegramMainButton(text, callback, options = {}) {
  const webApp = getTelegramWebApp();
  if (!webApp || !webApp.MainButton) return () => {};

  webApp.MainButton.setText(text);

  if (options.color) {
    webApp.MainButton.color = options.color;
  }
  if (options.textColor) {
    webApp.MainButton.textColor = options.textColor;
  }

  webApp.MainButton.onClick(callback);
  webApp.MainButton.show();

  // Return cleanup function
  return () => {
    webApp.MainButton.offClick(callback);
    webApp.MainButton.hide();
  };
}

/**
 * Hide the Telegram main button
 */
export function hideMainButton() {
  const webApp = getTelegramWebApp();
  if (webApp && webApp.MainButton) {
    webApp.MainButton.hide();
  }
}

/**
 * Trigger haptic feedback in Telegram
 * @param {'impact'|'notification'|'selection'} type - Feedback type
 * @param {'light'|'medium'|'heavy'|'rigid'|'soft'} style - Impact style (for 'impact' type)
 */
export function hapticFeedback(type = 'impact', style = 'medium') {
  const webApp = getTelegramWebApp();
  if (!webApp || !webApp.HapticFeedback) return;

  switch (type) {
    case 'impact':
      webApp.HapticFeedback.impactOccurred(style);
      break;
    case 'notification':
      webApp.HapticFeedback.notificationOccurred(style);
      break;
    case 'selection':
      webApp.HapticFeedback.selectionChanged();
      break;
    default:
      webApp.HapticFeedback.impactOccurred('medium');
  }
}
