/**
 * Firebase Authentication Module
 * 
 * Handles all Firebase auth operations including:
 * - Email/password registration and login
 * - Google sign-in via popup
 * - Custom token authentication (for Telegram Mini App flow)
 * - Auth state management
 * - ID token retrieval for API calls
 */

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithCustomToken,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase app and auth instance
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google auth provider instance
const googleProvider = new GoogleAuthProvider();

/**
 * Register a new user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's chosen password (min 6 chars)
 * @returns {Promise<UserCredential>} Firebase user credential
 */
export async function registerWithEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

/**
 * Sign in an existing user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<UserCredential>} Firebase user credential
 */
export async function loginWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Sign in with Google via popup
 * @returns {Promise<UserCredential>} Firebase user credential with Google profile
 */
export async function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

/**
 * Sign in with a custom token (used for Telegram auth flow)
 * The backend generates this token after validating Telegram initData
 * @param {string} token - Custom token from backend
 * @returns {Promise<UserCredential>} Firebase user credential
 */
export async function loginWithCustomToken(token) {
  return signInWithCustomToken(auth, token);
}

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export async function logout() {
  return signOut(auth);
}

/**
 * Subscribe to authentication state changes
 * @param {function} callback - Called with user object (or null) on state change
 * @returns {function} Unsubscribe function
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Get the currently signed-in user (synchronous snapshot)
 * @returns {User|null} Current Firebase user or null
 */
export function getCurrentUser() {
  return auth.currentUser;
}

/**
 * Get the current user's ID token for API authorization
 * Forces token refresh if expired
 * @param {boolean} forceRefresh - Force token refresh even if not expired
 * @returns {Promise<string|null>} JWT token string or null if not signed in
 */
export async function getIdToken(forceRefresh = false) {
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken(forceRefresh);
}

export { auth };
