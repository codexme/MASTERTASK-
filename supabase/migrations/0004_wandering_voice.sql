/*
  # Storage bucket setup

  1. New Storage Configuration
    - Creates 'attachments' bucket for file storage
    - Enables public access for authenticated users
  
  2. Security
    - Adds RLS policies for bucket access
    - Allows authenticated users to upload files
    - Allows public read access for attachments
*/

-- Enable storage by creating the bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('attachments', 'attachments', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'attachments');

-- Allow authenticated uploads
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'attachments'
  AND auth.role() = 'authenticated'
);

-- Allow users to update their own files
CREATE POLICY "Users can update own files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'attachments'
  AND owner = auth.uid()
)
WITH CHECK (
  bucket_id = 'attachments'
  AND owner = auth.uid()
);

-- Allow users to delete their own files
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'attachments'
  AND owner = auth.uid()
);