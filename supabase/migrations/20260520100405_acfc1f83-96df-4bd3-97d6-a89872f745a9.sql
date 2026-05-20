ALTER TABLE public.heritage_models
  ADD COLUMN IF NOT EXISTS title text,
  ADD COLUMN IF NOT EXISTS subtitle text,
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS audio_text text,
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS ancestor_name text,
  ADD COLUMN IF NOT EXISTS ancestor_greeting text,
  ADD COLUMN IF NOT EXISTS extended_knowledge jsonb DEFAULT '{}'::jsonb;