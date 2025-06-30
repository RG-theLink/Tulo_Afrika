/*
  # Create form submissions tables

  1. New Tables
    - `contact_form_submissions` - Stores contact form submissions
    - `partnership_requests` - Stores partnership form submissions
    - `demo_requests` - Stores demo request form submissions
    - `school_signup_submissions` - Stores school signup form submissions
    - `student_signup_submissions` - Stores student signup form submissions
  
  2. Security
    - Enable RLS on all tables
    - Add policies for users to view their own submissions
    - Add policies for admins to view all submissions
*/

-- Create contact form submissions table
CREATE TABLE IF NOT EXISTS contact_form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'responded', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create partnership requests table
CREATE TABLE IF NOT EXISTS partnership_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name TEXT NOT NULL,
  organization_type TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'contacted', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create demo requests table
CREATE TABLE IF NOT EXISTS demo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT NOT NULL,
  role TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create school signup submissions table
CREATE TABLE IF NOT EXISTS school_signup_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_name TEXT NOT NULL,
  institution_type TEXT NOT NULL,
  website TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  title TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  student_count TEXT NOT NULL,
  grade_range TEXT NOT NULL,
  current_lms TEXT,
  integration_type TEXT NOT NULL,
  timeline TEXT NOT NULL,
  budget TEXT NOT NULL,
  message TEXT NOT NULL,
  preferred_contact_method TEXT NOT NULL,
  preferred_time TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'onboarded', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create student signup submissions table (for tracking signup progress)
CREATE TABLE IF NOT EXISTS student_signup_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  age TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  learning_goals TEXT[],
  subjects TEXT[],
  learning_style TEXT NOT NULL,
  time_commitment TEXT NOT NULL,
  parent_email TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable Row Level Security
ALTER TABLE contact_form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnership_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_signup_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_signup_submissions ENABLE ROW LEVEL SECURITY;

-- Contact form submissions policies
CREATE POLICY "Users can view their own contact form submissions"
  ON contact_form_submissions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all contact form submissions"
  ON contact_form_submissions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can update contact form submissions"
  ON contact_form_submissions
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert contact form submissions"
  ON contact_form_submissions
  FOR INSERT
  WITH CHECK (true);

-- Partnership requests policies
CREATE POLICY "Users can view their own partnership requests"
  ON partnership_requests
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all partnership requests"
  ON partnership_requests
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can update partnership requests"
  ON partnership_requests
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert partnership requests"
  ON partnership_requests
  FOR INSERT
  WITH CHECK (true);

-- Demo requests policies
CREATE POLICY "Users can view their own demo requests"
  ON demo_requests
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all demo requests"
  ON demo_requests
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can update demo requests"
  ON demo_requests
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert demo requests"
  ON demo_requests
  FOR INSERT
  WITH CHECK (true);

-- School signup submissions policies
CREATE POLICY "Users can view their own school signup submissions"
  ON school_signup_submissions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all school signup submissions"
  ON school_signup_submissions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can update school signup submissions"
  ON school_signup_submissions
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert school signup submissions"
  ON school_signup_submissions
  FOR INSERT
  WITH CHECK (true);

-- Student signup submissions policies
CREATE POLICY "Users can view their own student signup submissions"
  ON student_signup_submissions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all student signup submissions"
  ON student_signup_submissions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can update student signup submissions"
  ON student_signup_submissions
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert student signup submissions"
  ON student_signup_submissions
  FOR INSERT
  WITH CHECK (true);