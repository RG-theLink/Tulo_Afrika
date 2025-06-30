/*
  # Create feedback system tables

  1. New Tables
    - `feedback_submissions` - Stores user feedback
    - `feedback_categories` - Stores feedback categories
    - `feedback_responses` - Stores responses to feedback
    - `user_badges` - Tracks badges earned by users
    - `available_badges` - Defines available badges
  
  2. Security
    - Enable RLS on all tables
    - Add policies for users to view their own feedback
    - Add policies for admins to manage all feedback
*/

-- Create feedback_categories table
CREATE TABLE IF NOT EXISTS feedback_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create feedback_submissions table
CREATE TABLE IF NOT EXISTS feedback_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES feedback_categories(id) ON DELETE CASCADE,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('platform', 'course', 'suggestion')),
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  rating INTEGER,
  satisfaction TEXT CHECK (satisfaction IN ('positive', 'neutral', 'negative')),
  title TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewed', 'implementing', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create feedback_responses table
CREATE TABLE IF NOT EXISTS feedback_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feedback_id UUID NOT NULL REFERENCES feedback_submissions(id) ON DELETE CASCADE,
  responder_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create available_badges table
CREATE TABLE IF NOT EXISTS available_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  requirements TEXT NOT NULL,
  points_value INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_badges table
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES available_badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT now(),
  progress INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Enable Row Level Security
ALTER TABLE feedback_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE available_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- Feedback categories policies
CREATE POLICY "Anyone can view feedback categories"
  ON feedback_categories
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage feedback categories"
  ON feedback_categories
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Feedback submissions policies
CREATE POLICY "Users can view their own feedback submissions"
  ON feedback_submissions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own feedback"
  ON feedback_submissions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Educators can view feedback for their courses"
  ON feedback_submissions
  FOR SELECT
  USING (
    feedback_type = 'course' AND
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = feedback_submissions.course_id AND courses.created_by = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all feedback submissions"
  ON feedback_submissions
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Feedback responses policies
CREATE POLICY "Users can view responses to their feedback"
  ON feedback_responses
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM feedback_submissions
      WHERE feedback_submissions.id = feedback_responses.feedback_id AND feedback_submissions.user_id = auth.uid()
    )
  );

CREATE POLICY "Educators can view and add responses to feedback for their courses"
  ON feedback_responses
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM feedback_submissions
      JOIN courses ON courses.id = feedback_submissions.course_id
      WHERE feedback_submissions.id = feedback_responses.feedback_id AND courses.created_by = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all feedback responses"
  ON feedback_responses
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Available badges policies
CREATE POLICY "Anyone can view available badges"
  ON available_badges
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage available badges"
  ON available_badges
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- User badges policies
CREATE POLICY "Users can view their own badges"
  ON user_badges
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all user badges"
  ON user_badges
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Insert default feedback categories
INSERT INTO feedback_categories (name, description, icon)
VALUES
  ('Platform', 'Feedback about the website, features, and usability', '🚀'),
  ('Course', 'Feedback about specific courses, content, and instructors', '📚'),
  ('Suggestion', 'Ideas for new features, improvements, or content', '💡'),
  ('Technical Issue', 'Reports of bugs, errors, or technical problems', '🔧'),
  ('User Experience', 'Feedback about the overall user experience', '👤');

-- Insert available badges
INSERT INTO available_badges (name, description, icon, category, requirements, points_value)
VALUES
  ('Feedback Champion', 'Provided 5 pieces of quality feedback', '🏆', 'Engagement', 'Submit 5 feedback items', 50),
  ('Idea Generator', 'Submitted 3 suggestions that were implemented', '💡', 'Contribution', 'Have 3 suggestions marked as implemented', 100),
  ('Course Critic', 'Provided detailed feedback on 10 courses', '🎓', 'Academic', 'Submit feedback for 10 different courses', 75),
  ('Platform Pioneer', 'Helped improve the platform with valuable feedback', '🚀', 'Contribution', 'Submit feedback that leads to platform improvements', 100),
  ('First Feedback', 'Submitted your first feedback', '🌟', 'Engagement', 'Submit your first feedback', 10),
  ('Consistent Contributor', 'Provided feedback for 3 consecutive months', '📅', 'Engagement', 'Submit feedback in 3 consecutive months', 50);