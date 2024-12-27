/*
  # Fix storage permissions and policies

  1. Changes
    - Create storage bucket if it doesn't exist
    - Update storage policies for public access
    - Ensure existing files are preserved
*/

-- Create bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('attachments', 'attachments', true)
ON CONFLICT (id) DO UPDATE
SET public = true;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Update Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own files" ON storage.objects;

-- Create new policies with public access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'attachments');

CREATE POLICY "Public Upload Access"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'attachments');

CREATE POLICY "Public Update Access"
ON storage.objects FOR UPDATE
USING (bucket_id = 'attachments')
WITH CHECK (bucket_id = 'attachments');

CREATE POLICY "Public Delete Access"
ON storage.objects FOR DELETE
USING (bucket_id = 'attachments');