-- Supabase SQL: Run this in the SQL Editor (Dashboard → SQL Editor)
-- Creates the user_progress table for storing app state per user.

-- 1. Create the table
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  progress JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- 3. Users can only read/write their OWN row
CREATE POLICY "Users can view own progress"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own progress"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own progress"
  ON public.user_progress FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can delete own progress"
  ON public.user_progress FOR DELETE
  USING (auth.uid() = id);

-- 4. Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_progress_updated
  ON public.user_progress(updated_at DESC);
