/**
 * Progress Sync — saves/loads user progress from Supabase DB.
 *
 * Table: user_progress
 *   - id (uuid, FK to auth.users.id)
 *   - progress (jsonb)
 *   - updated_at (timestamptz)
 *
 * The full app state (progress, vocabulary, stats) is stored as a single
 * JSON blob in the `progress` column. This keeps the schema simple and
 * allows the frontend to own the data model.
 */

import { supabase } from './supabase'

/**
 * Save user progress to Supabase.
 * Uses upsert (insert or update) keyed by user ID.
 */
export async function saveProgress(userId, data) {
  if (!userId) return null

  const { error } = await supabase
    .from('user_progress')
    .upsert(
      {
        id: userId,
        progress: data,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    )

  if (error) {
    console.warn('[ProgressSync] Save failed:', error.message)
    return null
  }
  return true
}

/**
 * Load user progress from Supabase.
 * Returns the stored JSON blob or null if not found.
 */
export async function loadProgress(userId) {
  if (!userId) return null

  const { data, error } = await supabase
    .from('user_progress')
    .select('progress, updated_at')
    .eq('id', userId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // not found
    console.warn('[ProgressSync] Load failed:', error.message)
    return null
  }

  return data?.progress || null
}

/**
 * Delete user progress from Supabase.
 */
export async function deleteProgress(userId) {
  if (!userId) return
  await supabase.from('user_progress').delete().eq('id', userId)
}
