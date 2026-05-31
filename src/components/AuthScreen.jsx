/**
 * AuthScreen Component
 * 
 * Full-screen authentication UI with:
 * - Tab switching between Login and Register
 * - Email/password form with validation
 * - Google sign-in button
 * - Telegram auto-auth indicator (when in Mini App)
 * - Error messages in Uzbek
 * - Loading spinner states
 */

import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

/**
 * Spinner component for loading states
 */
function Spinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-emerald-500 border-t-transparent" />
    </div>
  );
}

/**
 * Google Icon SVG
 */
function GoogleIcon() {
  return (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/**
 * Main AuthScreen component
 * Shows login/register forms or Telegram auto-auth state
 */
export default function AuthScreen() {
  const { login, register, loginGoogle, loading, error, isTelegram, clearError } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  // If loading (e.g., Telegram auto-auth in progress), show spinner
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-emerald-800 mb-4">
            {isTelegram ? 'Telegram orqali kirilmoqda...' : 'Yuklanmoqda...'}
          </h1>
          <Spinner />
          {isTelegram && (
            <p className="text-sm text-gray-500 mt-4">
              Avtomatik tizimga kirilmoqda
            </p>
          )}
        </div>
      </div>
    );
  }

  // If in Telegram and still showing auth screen, there might be an error
  if (isTelegram && !error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 px-4">
        <Spinner />
        <p className="text-sm text-gray-600 mt-4">Telegram bilan ulanmoqda...</p>
      </div>
    );
  }

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    clearError();

    // Validation
    if (!email.trim()) {
      setFormError('Email kiritilishi shart');
      return;
    }

    if (!password || password.length < 6) {
      setFormError('Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
      return;
    }

    if (activeTab === 'register' && password !== confirmPassword) {
      setFormError('Parollar mos kelmaydi');
      return;
    }

    try {
      if (activeTab === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch {
      // Error is already handled in AuthContext
    }
  };

  /**
   * Handle Google sign-in
   */
  const handleGoogleLogin = async () => {
    setFormError('');
    clearError();
    try {
      await loginGoogle();
    } catch {
      // Error handled in context
    }
  };

  /**
   * Switch tab and clear errors
   */
  const switchTab = (tab) => {
    setActiveTab(tab);
    setFormError('');
    clearError();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 px-4 py-8">
      {/* Logo / Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-800">
          Arab Tili Akademiyasi
        </h1>
        <p className="text-gray-600 mt-2">
          Arabcha o'rganishni boshlang
        </p>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6">
        {/* Tabs */}
        <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
          <button
            onClick={() => switchTab('login')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'login'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Kirish
          </button>
          <button
            onClick={() => switchTab('register')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'register'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Ro'yxatdan o'tish
          </button>
        </div>

        {/* Error Display */}
        {(error || formError) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              {formError || error}
            </p>
          </div>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@misol.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parol
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Kamida 6 ta belgi"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
              autoComplete={activeTab === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {/* Confirm Password (Register only) */}
          {activeTab === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parolni tasdiqlang
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Parolni qayta kiriting"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                autoComplete="new-password"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 active:bg-emerald-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Kutilmoqda...
              </span>
            ) : activeTab === 'login' ? (
              'Kirish'
            ) : (
              'Ro\'yxatdan o\'tish'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-200" />
          <span className="px-3 text-xs text-gray-400 uppercase">yoki</span>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition disabled:opacity-50"
        >
          <GoogleIcon />
          <span className="text-sm font-medium text-gray-700">
            Google bilan kirish
          </span>
        </button>

        {/* Telegram hint */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Telegram Mini App orqali avtomatik kiring
        </p>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400 mt-6">
        &copy; 2024 Arab Tili Akademiyasi
      </p>
    </div>
  );
}
