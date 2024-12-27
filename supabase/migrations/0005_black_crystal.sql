/*
  # Fix storage policies for demo access

  1. Changes
    - Update storage policies to allow public access for demo purposes
    - Remove authentication requirements for uploads
    - Enable public access for all storage operations
*/

-- Allow public uploads
CREATE POLICY "Public Upload Access"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'attachments');

-- Allow public updates
CREATE POLICY "Public Update Access"
ON storage.objects FOR UPDATE
USING (bucket_id = 'attachments')
WITH CHECK (bucket_id = 'attachments');

-- Allow public deletes
CREATE POLICY "Public Delete Access"
ON storage.objects FOR DELETE
USING (bucket_id = 'attachments');