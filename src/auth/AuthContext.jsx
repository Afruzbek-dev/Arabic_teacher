/**
 * Authentication Context
 * 
 * Provides auth state and methods to the entire app via React Context.
 * 
 * Features:
 * - Firebase auth state listener (auto-detects signed-in user)
 * - Telegram Mini App auto-authentication flow
 * - Error code mapping to Uzbek-language messages
 * - Cloud sync integration on auth state changes
 * 
 * Usage:
 *   <AuthProvider>
 *     <App />
 *   </AuthProvider>
 * 
 *   const { user, loading, error, login, register, loginGoogle, logout } = useAuth();
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  auth,
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
  loginWithCustomToken,
  logout as firebaseLogout,
  onAuthChange,
} from './firebase';
import {
  isTelegramMiniApp,
  getTelegramInitData,
  getTelegramUser,
  telegramReady,
} from './telegram';
import { syncUserToCloud, fetchUserFromCloud } from './cloudSync';

// Backend URL for Telegram auth endpoint
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

// --- Error Code Mapping (Firebase → Uzbek) ---
const ERROR_MESSAGES = {
  'auth/email-already-in-use': 'Bu email allaqachon ro\'yxatdan o\'tgan',
  'auth/invalid-email': 'Email manzil noto\'g\'ri formatda',
  'auth/operation-not-allowed': 'Bu kirish usuli faol emas',
  'auth/weak-password': 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak',
  'auth/user-disabled': 'Bu hisob bloklangan',
  'auth/user-not-found': 'Bunday foydalanuvchi topilmadi',
  'auth/wrong-password': 'Parol noto\'g\'ri',
  'auth/too-many-requests': 'Juda ko\'p urinish. Biroz kuting',
  'auth/network-request-failed': 'Internet aloqasi yo\'q',
  'auth/popup-closed-by-user': 'Kirish oynasi yopildi',
  'auth/popup-blocked': 'Popup oyna bloklandi. Ruxsat bering',
  'auth/invalid-credential': 'Kirish ma\'lumotlari noto\'g\'ri',
  'auth/invalid-login-credentials': 'Email yoki parol noto\'g\'ri',
  'telegram-auth-failed': 'Telegram orqali kirish muvaffaqiyatsiz',
  'default': 'Noma\'lum xatolik yuz berdi',
};

/**
 * Get Uzbek error message for Firebase auth error code
 * @param {string} code - Firebase error code
 * @returns {string} Uzbek error message
 */
function getErrorMessage(code) {
  return ERROR_MESSAGES[code] || ERROR_MESSAGES['default'];
}

// --- Context ---
const AuthContext = createContext(null);

/**
 * Authentication Provider Component
 * Wraps the app and provides auth state + methods
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTelegram, setIsTelegram] = useState(false);
  const [cloudData, setCloudData] = useState(null);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  /**
   * Authenticate via Telegram Mini App
   * Sends initData to backend → backend validates with Telegram → returns custom token
   */
  const authenticateWithTelegram = useCallback(async () => {
    if (!BACKEND_URL) {
      console.warn('[Auth] Backend URL not configured for Telegram auth');
      setLoading(false);
      return;
    }

    try {
      const initData = getTelegramInitData();
      const telegramUser = getTelegramUser();

      if (!initData) {
        throw new Error('Telegram initData not available');
      }

      // Call backend to validate initData and get Firebase custom token
      const response = await fetch(`${BACKEND_URL}/api/auth/telegram`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          initData,
          user: telegramUser,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Telegram auth failed');
      }

      const { customToken } = await response.json();

      // Sign in to Firebase with the custom token
      await loginWithCustomToken(customToken);

      // Signal Telegram that app is ready
      telegramReady();
    } catch (err) {
      console.error('[Auth] Telegram authentication failed:', err);
      setError(getErrorMessage('telegram-auth-failed'));
      setLoading(false);
    }
  }, []);

  // --- Firebase Auth State Listener ---
  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          providerId: firebaseUser.providerData?.[0]?.providerId || 'custom',
        });

        // Fetch cloud data on sign-in
        try {
          const data = await fetchUserFromCloud(firebaseUser.uid);
          if (data) {
            setCloudData(data);
          }
        } catch (err) {
          console.warn('[Auth] Cloud data fetch failed:', err.message);
        }
      } else {
        setUser(null);
        setCloudData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- Telegram Auto-Login on Mount ---
  useEffect(() => {
    if (isTelegramMiniApp()) {
      setIsTelegram(true);
      authenticateWithTelegram();
    }
  }, [authenticateWithTelegram]);

  // --- Auth Methods ---

  /**
   * Register with email and password
   */
  const register = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await registerWithEmail(email, password);
    } catch (err) {
      setError(getErrorMessage(err.code));
      setLoading(false);
      throw err;
    }
  };

  /**
   * Login with email and password
   */
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await loginWithEmail(email, password);
    } catch (err) {
      setError(getErrorMessage(err.code));
      setLoading(false);
      throw err;
    }
  };

  /**
   * Login with Google popup
   */
  const loginGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(getErrorMessage(err.code));
      setLoading(false);
      throw err;
    }
  };

  /**
   * Logout current user
   */
  const handleLogout = async () => {
    setError(null);
    try {
      await firebaseLogout();
    } catch (err) {
      setError(getErrorMessage(err.code));
    }
  };

  /**
   * Sync current progress to cloud
   */
  const syncProgress = async (data) => {
    if (!user) return;
    try {
      await syncUserToCloud(user.uid, data);
    } catch (err) {
      console.warn('[Auth] Progress sync failed:', err.message);
    }
  };

  // --- Context Value ---
  const value = {
    user,
    loading,
    error,
    isTelegram,
    cloudData,
    register,
    login,
    loginGoogle,
    logout: handleLogout,
    syncProgress,
    clearError: () => setError(null),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context
 * Must be used within an AuthProvider
 * @returns {object} Auth state and methods
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
