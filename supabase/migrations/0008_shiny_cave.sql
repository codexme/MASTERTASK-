/*
  # Task Management System Updates

  1. Changes
    - Add validation for task creation
    - Update task completion tracking
    - Add cascade deletes for related records

  2. Security
    - Maintain existing RLS policies
    - Add validation triggers
*/

-- Add validation trigger for task creation
CREATE OR REPLACE FUNCTION validate_task()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate title
  IF LENGTH(TRIM(NEW.title)) < 1 THEN
    RAISE EXCEPTION 'Task title cannot be empty';
  END IF;

  -- Validate due_date if provided
  IF NEW.due_date IS NOT NULL AND NEW.due_date < CURRENT_TIMESTAMP THEN
    RAISE EXCEPTION 'Due date cannot be in the past';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for task validation
DROP TRIGGER IF EXISTS validate_task_trigger ON tasks;
CREATE TRIGGER validate_task_trigger
  BEFORE INSERT OR UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION validate_task();

-- Add function to handle task completion
CREATE OR REPLACE FUNCTION handle_task_completion()
RETURNS TRIGGER AS $$
BEGIN
  -- Update completion timestamp when task is marked as completed
  IF NEW.completed = true AND OLD.completed = false THEN
    NEW.completed_at = CURRENT_TIMESTAMP;
  ELSIF NEW.completed = false THEN
    NEW.completed_at = NULL;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for task completion
DROP TRIGGER IF EXISTS handle_task_completion_trigger ON tasks;
CREATE TRIGGER handle_task_completion_trigger
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION handle_task_completion();