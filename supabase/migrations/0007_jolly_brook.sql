/*
  # Task Management System Updates

  1. Changes
    - Add due_date column to tasks table
    - Add validation triggers for due dates
    - Add indexes for better query performance

  2. Security
    - Maintain existing RLS policies
    - Add validation to prevent past due dates
*/

-- Add due_date column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tasks' AND column_name = 'due_date'
  ) THEN
    ALTER TABLE tasks ADD COLUMN due_date TIMESTAMPTZ;
    
    -- Add index for due date queries
    CREATE INDEX idx_tasks_due_date ON tasks(due_date);
  END IF;
END $$;

-- Create a function to validate due dates
CREATE OR REPLACE FUNCTION validate_due_date()
RETURNS TRIGGER AS $$
BEGIN
  -- Allow null due dates
  IF NEW.due_date IS NULL THEN
    RETURN NEW;
  END IF;

  -- Ensure due date is not in the past when creating/updating tasks
  IF NEW.due_date < CURRENT_TIMESTAMP THEN
    RAISE EXCEPTION 'Due date cannot be in the past';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for due date validation
DROP TRIGGER IF EXISTS validate_due_date_trigger ON tasks;
CREATE TRIGGER validate_due_date_trigger
  BEFORE INSERT OR UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION validate_due_date();

-- Add composite index for user tasks by due date
CREATE INDEX IF NOT EXISTS idx_tasks_user_due_date 
ON tasks(user_id, due_date)
WHERE completed = false;

-- Update task update function to set updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ensure updated_at is automatically set
DROP TRIGGER IF EXISTS set_updated_at ON tasks;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();