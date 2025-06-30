/*
  # Create analytics system tables

  1. New Tables
    - `user_activity_logs` - Tracks user activity
    - `learning_analytics` - Stores learning analytics data
    - `system_metrics` - Stores system performance metrics
  
  2. Security
    - Enable RLS on all tables
    - Add policies for users to view their own activity
    - Add policies for educators to view analytics for their students
    - Add policies for admins to view all analytics
*/

-- Create user_activity_logs table
CREATE TABLE IF NOT EXISTS user_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create learning_analytics table
CREATE TABLE IF NOT EXISTS learning_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week_starting DATE NOT NULL,
  study_hours DECIMAL(10, 2) NOT NULL DEFAULT 0,
  lessons_completed INTEGER NOT NULL DEFAULT 0,
  average_score INTEGER,
  streak_days INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, week_starting)
);

-- Create system_metrics table
CREATE TABLE IF NOT EXISTS system_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  metric_value DECIMAL(10, 2) NOT NULL,
  metric_unit TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_name TEXT NOT NULL,
  achievement_description TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- User activity logs policies
CREATE POLICY "Users can view their own activity logs"
  ON user_activity_logs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Educators can view activity logs for their students"
  ON user_activity_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM group_members AS gm1
      JOIN group_members AS gm2 ON gm1.group_id = gm2.group_id
      WHERE gm1.user_id = auth.uid() AND gm1.role = 'educator' AND gm2.user_id = user_activity_logs.user_id
    )
  );

CREATE POLICY "Admins can view all activity logs"
  ON user_activity_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "System can insert activity logs"
  ON user_activity_logs
  FOR INSERT
  WITH CHECK (true);

-- Learning analytics policies
CREATE POLICY "Users can view their own learning analytics"
  ON learning_analytics
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Educators can view analytics for their students"
  ON learning_analytics
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM group_members AS gm1
      JOIN group_members AS gm2 ON gm1.group_id = gm2.group_id
      WHERE gm1.user_id = auth.uid() AND gm1.role = 'educator' AND gm2.user_id = learning_analytics.user_id
    )
  );

CREATE POLICY "Admins can view all learning analytics"
  ON learning_analytics
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "System can insert and update learning analytics"
  ON learning_analytics
  FOR ALL
  USING (true);

-- System metrics policies
CREATE POLICY "Admins can view system metrics"
  ON system_metrics
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "System can insert system metrics"
  ON system_metrics
  FOR INSERT
  WITH CHECK (true);

-- User achievements policies
CREATE POLICY "Users can view their own achievements"
  ON user_achievements
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Educators can view achievements for their students"
  ON user_achievements
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM group_members AS gm1
      JOIN group_members AS gm2 ON gm1.group_id = gm2.group_id
      WHERE gm1.user_id = auth.uid() AND gm1.role = 'educator' AND gm2.user_id = user_achievements.user_id
    )
  );

CREATE POLICY "Admins can view all achievements"
  ON user_achievements
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "System can insert achievements"
  ON user_achievements
  FOR INSERT
  WITH CHECK (true);