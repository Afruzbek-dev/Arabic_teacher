/**
 * Cloud Sync Module
 * 
 * Handles synchronization of user progress data between the frontend
 * and the Cloudflare Workers backend (KV storage).
 * 
 * All requests are authenticated using Firebase ID tokens.
 */

import { getIdToken } from './firebase';

// Backend API base URL from environment
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

/**
 * Get authorization headers with the current user's Firebase ID token
 * @returns {Promise<object>} Headers object with Authorization bearer token
 * @throws {Error} If user is not authenticated
 */
async function getAuthHeaders() {
  const token = await getIdToken();
  if (!token) {
    throw new Error('Foydalanuvchi tizimga kirmagan');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

/**
 * Sync user progress data to the cloud
 * Creates or updates the user's progress record in Cloudflare KV
 * 
 * @param {string} uid - Firebase user UID
 * @param {object} data - Progress data to sync (lessons, XP, streak, etc.)
 * @returns {Promise<object>} Response data from the backend
 * @throws {Error} If sync fails or user is not authenticated
 */
export async function syncUserToCloud(uid, data) {
  if (!BACKEND_URL) {
    console.warn('[CloudSync] Backend URL not configured, skipping sync');
    return null;
  }

  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BACKEND_URL}/api/user/${uid}/progress`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        ...data,
        lastSyncedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Sinxronlash xatosi: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('[CloudSync] Sync failed:', error.message);
    throw error;
  }
}

/**
 * Fetch user progress data from the cloud
 * Retrieves the latest saved progress from Cloudflare KV
 * 
 * @param {string} uid - Firebase user UID
 * @returns {Promise<object|null>} User progress data or null if not found
 * @throws {Error} If fetch fails or user is not authenticated
 */
export async function fetchUserFromCloud(uid) {
  if (!BACKEND_URL) {
    console.warn('[CloudSync] Backend URL not configured, skipping fetch');
    return null;
  }

  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BACKEND_URL}/api/user/${uid}/progress`, {
      method: 'GET',
      headers,
    });

    // 404 means no data saved yet — not an error
    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Ma'lumot olishda xato: ${response.status}`);
    }

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('[CloudSync] Fetch failed:', error.message);
    throw error;
  }
}

/**
 * Delete user data from the cloud
 * Removes all progress data for the specified user from Cloudflare KV
 * 
 * @param {string} uid - Firebase user UID
 * @returns {Promise<object>} Confirmation response from backend
 * @throws {Error} If deletion fails or user is not authenticated
 */
export async function deleteUserFromCloud(uid) {
  if (!BACKEND_URL) {
    console.warn('[CloudSync] Backend URL not configured, skipping delete');
    return null;
  }

  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BACKEND_URL}/api/user/${uid}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `O'chirishda xato: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('[CloudSync] Delete failed:', error.message);
    throw error;
  }
}
