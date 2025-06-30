/*
  # Create educational content tables

  1. New Tables
    - `courses` - Stores course information
    - `lessons` - Stores lesson content for courses
    - `resources` - Stores educational resources
    - `announcements` - Stores system and course announcements
    - `user_progress` - Tracks user progress through courses
  
  2. Security
    - Enable RLS on all tables
    - Add policies for users to view content
    - Add policies for educators to manage content
    - Add policies for admins to manage all content
*/

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail TEXT,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  published_at TIMESTAMPTZ
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  duration_minutes INTEGER,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('External Link', 'Document', 'Video', 'Interactive', 'Assessment')),
  access_level TEXT NOT NULL CHECK (access_level IN ('Free', 'Premium', 'Restricted')),
  url TEXT NOT NULL,
  thumbnail TEXT,
  creator TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create resource_access table to manage which subscription tiers can access resources
CREATE TABLE IF NOT EXISTS resource_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  subscription_tier TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(resource_id, subscription_tier)
);

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('system', 'course', 'event')),
  priority TEXT NOT NULL CHECK (priority IN ('low', 'normal', 'high')),
  target_group TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  progress_percentage INTEGER NOT NULL DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  last_accessed_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Create lesson_completion table
CREATE TABLE IF NOT EXISTS lesson_completion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT now(),
  score INTEGER,
  time_spent_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_completion ENABLE ROW LEVEL SECURITY;

-- Courses policies
CREATE POLICY "Anyone can view published courses"
  ON courses
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Educators can view all courses"
  ON courses
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Educators can insert courses"
  ON courses
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Educators can update their own courses"
  ON courses
  FOR UPDATE
  USING (
    auth.uid() = created_by AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Admins can manage all courses"
  ON courses
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Lessons policies
CREATE POLICY "Anyone can view published lessons"
  ON lessons
  FOR SELECT
  USING (
    status = 'published' AND
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = lessons.course_id AND courses.status = 'published'
    )
  );

CREATE POLICY "Educators can view all lessons"
  ON lessons
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Educators can insert lessons"
  ON lessons
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Educators can update their own lessons"
  ON lessons
  FOR UPDATE
  USING (
    auth.uid() = created_by AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Admins can manage all lessons"
  ON lessons
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Resources policies
CREATE POLICY "Anyone can view free resources"
  ON resources
  FOR SELECT
  USING (
    status = 'active' AND access_level = 'Free'
  );

CREATE POLICY "Premium users can view premium resources"
  ON resources
  FOR SELECT
  USING (
    status = 'active' AND
    (
      access_level = 'Free' OR
      (
        access_level = 'Premium' AND
        EXISTS (
          SELECT 1 FROM student_profiles
          WHERE id = auth.uid() AND subscription_tier != 'Free Tier'
        )
      )
    )
  );

CREATE POLICY "Educators can view all resources"
  ON resources
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Educators can insert resources"
  ON resources
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Educators can update their own resources"
  ON resources
  FOR UPDATE
  USING (
    auth.uid() = created_by AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Admins can manage all resources"
  ON resources
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Resource access policies
CREATE POLICY "Anyone can view resource access"
  ON resource_access
  FOR SELECT
  USING (true);

CREATE POLICY "Educators can manage resource access"
  ON resource_access
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Admins can manage all resource access"
  ON resource_access
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Announcements policies
CREATE POLICY "Anyone can view announcements"
  ON announcements
  FOR SELECT
  USING (
    target_group = 'All' OR
    (
      target_group = 'Students' AND
      EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND user_type = 'student'
      )
    ) OR
    (
      target_group = 'Educators' AND
      EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND user_type = 'educator'
      )
    )
  );

CREATE POLICY "Educators can insert announcements"
  ON announcements
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Educators can update their own announcements"
  ON announcements
  FOR UPDATE
  USING (
    auth.uid() = created_by AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Admins can manage all announcements"
  ON announcements
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- User progress policies
CREATE POLICY "Users can view their own progress"
  ON user_progress
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON user_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON user_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Educators can view student progress"
  ON user_progress
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Admins can manage all progress"
  ON user_progress
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Lesson completion policies
CREATE POLICY "Users can view their own lesson completions"
  ON lesson_completion
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own lesson completions"
  ON lesson_completion
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Educators can view student lesson completions"
  ON lesson_completion
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Admins can manage all lesson completions"
  ON lesson_completion
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );