/*
  # Create user profiles tables and security policies

  1. New Tables
    - `profiles` - Stores user profile information
    - `student_profiles` - Stores student-specific information
    - `educator_profiles` - Stores educator-specific information
    - `admin_profiles` - Stores admin-specific information
  
  2. Security
    - Enable RLS on all tables
    - Add policies for users to read/write their own data
    - Add policies for admins to manage all profiles
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  user_type TEXT NOT NULL CHECK (user_type IN ('student', 'educator', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create student profiles table
CREATE TABLE IF NOT EXISTS student_profiles (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  age INTEGER,
  grade_level TEXT,
  learning_goals TEXT[],
  subjects TEXT[],
  learning_style TEXT,
  time_commitment TEXT,
  parent_email TEXT,
  subscription_tier TEXT DEFAULT 'Free Tier',
  subscription_status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create educator profiles table
CREATE TABLE IF NOT EXISTS educator_profiles (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  specialization TEXT,
  bio TEXT,
  subscription_tier TEXT DEFAULT 'Educator Basic',
  subscription_status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create admin profiles table
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'admin',
  permissions TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE educator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can update all profiles"
  ON profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Student profiles policies
CREATE POLICY "Students can view their own profile"
  ON student_profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Students can update their own profile"
  ON student_profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all student profiles"
  ON student_profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can update all student profiles"
  ON student_profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Educator profiles policies
CREATE POLICY "Educators can view their own profile"
  ON educator_profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Educators can update their own profile"
  ON educator_profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all educator profiles"
  ON educator_profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can update all educator profiles"
  ON educator_profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Admin profiles policies
CREATE POLICY "Admins can view all admin profiles"
  ON admin_profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can update all admin profiles"
  ON admin_profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, first_name, last_name, email, user_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'New'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', 'User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'student')
  );

  -- Insert into specific profile table based on user_type
  IF NEW.raw_user_meta_data->>'user_type' = 'student' THEN
    INSERT INTO public.student_profiles (
      id,
      age,
      grade_level,
      learning_goals,
      subjects,
      learning_style,
      time_commitment,
      parent_email
    ) VALUES (
      NEW.id,
      (NEW.raw_user_meta_data->>'age')::INTEGER,
      NEW.raw_user_meta_data->>'grade_level',
      COALESCE((NEW.raw_user_meta_data->>'learning_goals')::TEXT[], '{}'),
      COALESCE((NEW.raw_user_meta_data->>'subjects')::TEXT[], '{}'),
      NEW.raw_user_meta_data->>'learning_style',
      NEW.raw_user_meta_data->>'time_commitment',
      NEW.raw_user_meta_data->>'parent_email'
    );
  ELSIF NEW.raw_user_meta_data->>'user_type' = 'educator' THEN
    INSERT INTO public.educator_profiles (
      id,
      specialization,
      bio
    ) VALUES (
      NEW.id,
      NEW.raw_user_meta_data->>'specialization',
      NEW.raw_user_meta_data->>'bio'
    );
  ELSIF NEW.raw_user_meta_data->>'user_type' = 'admin' THEN
    INSERT INTO public.admin_profiles (
      id,
      role,
      permissions
    ) VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'role', 'admin'),
      COALESCE((NEW.raw_user_meta_data->>'permissions')::TEXT[], '{"read", "write"}')
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();