/*
  # Add demo access policies

  1. Changes
    - Add policies to allow public access to tasks and subtasks
    - This enables the app to work without authentication for demo purposes
    
  2. Security
    - Tasks and subtasks are publicly readable and writable
    - This is for demo purposes only and should be replaced with proper auth in production
*/

-- Add public access policy for tasks
CREATE POLICY "Allow public access to tasks"
ON tasks
FOR ALL
USING (true)
WITH CHECK (true);

-- Add public access policy for subtasks
CREATE POLICY "Allow public access to subtasks"
ON subtasks
FOR ALL
USING (true)
WITH CHECK (true);

-- Add public access policy for links
CREATE POLICY "Allow public access to links"
ON links
FOR ALL
USING (true)
WITH CHECK (true);

-- Add public access policy for attachments
CREATE POLICY "Allow public access to attachments"
ON attachments
FOR ALL
USING (true)
WITH CHECK (true);