/*
  # Add pricing and subscription tables

  1. New Tables
    - `plans`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `monthly_price` (integer)
      - `yearly_price` (integer)
      - `features` (text[])
      - `task_limit` (integer)
      - `created_at` (timestamptz)
    
    - `subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `plan_id` (uuid, references plans)
      - `status` (text)
      - `current_period_end` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create plans table
CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  monthly_price INTEGER NOT NULL,
  yearly_price INTEGER NOT NULL,
  features TEXT[] NOT NULL,
  task_limit INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  plan_id UUID REFERENCES plans(id) NOT NULL,
  status TEXT NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Plans are viewable by everyone"
  ON plans FOR SELECT
  USING (true);

CREATE POLICY "Users can view their own subscriptions"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own subscriptions"
  ON subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Insert default plans
INSERT INTO plans (name, description, monthly_price, yearly_price, features, task_limit)
VALUES
  ('Free', 'Perfect for getting started', 0, 0, 
   ARRAY['10 Tasks', 'Basic AI Functions', 'Task Management', 'File Attachments', 'Email Support'],
   10),
  ('Pro', 'Best for professionals', 2000, 21600,
   ARRAY['100 Tasks', 'Advanced AI Features', 'Priority Support', 'Team Collaboration', 'Custom Categories', 'Analytics Dashboard', 'API Access'],
   100),
  ('Enterprise', 'For serious productivity', 5000, 54000,
   ARRAY['Unlimited Tasks', 'Premium AI Features', '24/7 Priority Support', 'Advanced Team Features', 'Custom Integrations', 'Advanced Analytics', 'Dedicated Account Manager', 'Custom Training'],
   -1)
ON CONFLICT DO NOTHING;