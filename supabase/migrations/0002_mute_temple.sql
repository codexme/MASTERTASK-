/*
  # Setup demo access

  1. Changes
    - Create demo user in auth schema
    - Create demo user in public schema
    - Add policies for demo access
  
  2. Security
    - Maintain RLS while allowing demo access
    - Policies scoped to specific demo user
*/

-- Create demo user in auth schema
INSERT INTO auth.users (id, email)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'demo@example.com'
) ON CONFLICT (id) DO NOTHING;

-- Create demo user in public schema
INSERT INTO public.users (id, email, points)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'demo@example.com',
  0
) ON CONFLICT (id) DO NOTHING;

-- Add demo access policy for tasks
CREATE POLICY "Allow demo user access to tasks"
ON tasks
FOR ALL
USING (
  user_id = '00000000-0000-0000-0000-000000000000'
  OR auth.uid() = user_id
);

-- Add demo access policy for subtasks
CREATE POLICY "Allow demo user access to subtasks"
ON subtasks
FOR ALL
USING (
  task_id IN (
    SELECT id FROM tasks 
    WHERE user_id = '00000000-0000-0000-0000-000000000000'
    OR user_id = auth.uid()
  )
);