/*
  # Create user management tables

  1. New Tables
    - `groups` - Stores class/group information
    - `group_members` - Tracks which users belong to which groups
    - `user_goals` - Stores user learning goals
    - `goal_milestones` - Stores milestones for goals
    - `user_schedules` - Stores user schedules and events
  
  2. Security
    - Enable RLS on all tables
    - Add policies for users to view their own data
    - Add policies for educators to manage their groups
    - Add policies for admins to manage all data
*/

-- Create groups table
CREATE TABLE IF NOT EXISTS groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_private BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create group_members table
CREATE TABLE IF NOT EXISTS group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('student', 'educator', 'admin')),
  joined_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Create user_goals table
CREATE TABLE IF NOT EXISTS user_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  deadline DATE,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  progress INTEGER DEFAULT 0,
  status TEXT DEFAULT 'in-progress' CHECK (status IN ('not-started', 'in-progress', 'completed', 'overdue')),
  assigned_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create goal_milestones table
CREATE TABLE IF NOT EXISTS goal_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID NOT NULL REFERENCES user_goals(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_schedules table
CREATE TABLE IF NOT EXISTS user_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  day_of_week TEXT NOT NULL CHECK (day_of_week IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  event_type TEXT NOT NULL,
  subject TEXT,
  group_id UUID REFERENCES groups(id) ON DELETE SET NULL,
  is_recurring BOOLEAN DEFAULT false,
  recurring_pattern TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create schedule_requests table
CREATE TABLE IF NOT EXISTS schedule_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subjects TEXT[],
  study_hours TEXT NOT NULL,
  preferred_times TEXT[],
  goals TEXT NOT NULL,
  current_level TEXT NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create online_classes table
CREATE TABLE IF NOT EXISTS online_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  group_id UUID REFERENCES groups(id) ON DELETE SET NULL,
  meeting_link TEXT,
  is_recurring BOOLEAN DEFAULT false,
  recurring_pattern TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'completed', 'cancelled')),
  recording_link TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create class_attendees table
CREATE TABLE IF NOT EXISTS class_attendees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES online_classes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'invited' CHECK (status IN ('invited', 'confirmed', 'attended', 'absent')),
  joined_at TIMESTAMPTZ,
  left_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(class_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE goal_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE online_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_attendees ENABLE ROW LEVEL SECURITY;

-- Groups policies
CREATE POLICY "Users can view groups they are members of"
  ON groups
  FOR SELECT
  USING (
    NOT is_private OR
    EXISTS (
      SELECT 1 FROM group_members
      WHERE group_members.group_id = groups.id AND group_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Educators can create groups"
  ON groups
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Educators can update groups they created"
  ON groups
  FOR UPDATE
  USING (
    auth.uid() = created_by AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Admins can manage all groups"
  ON groups
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Group members policies
CREATE POLICY "Users can view their own group memberships"
  ON group_members
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Educators can view members of groups they created"
  ON group_members
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM groups
      WHERE groups.id = group_members.group_id AND groups.created_by = auth.uid()
    )
  );

CREATE POLICY "Educators can add members to groups they created"
  ON group_members
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM groups
      WHERE groups.id = group_members.group_id AND groups.created_by = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all group members"
  ON group_members
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- User goals policies
CREATE POLICY "Users can view their own goals"
  ON user_goals
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own goals"
  ON user_goals
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals"
  ON user_goals
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Educators can view goals they assigned"
  ON user_goals
  FOR SELECT
  USING (auth.uid() = assigned_by);

CREATE POLICY "Educators can insert goals for their students"
  ON user_goals
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Admins can manage all goals"
  ON user_goals
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Goal milestones policies
CREATE POLICY "Users can view milestones for their goals"
  ON goal_milestones
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_goals
      WHERE user_goals.id = goal_milestones.goal_id AND user_goals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update milestones for their goals"
  ON goal_milestones
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_goals
      WHERE user_goals.id = goal_milestones.goal_id AND user_goals.user_id = auth.uid()
    )
  );

CREATE POLICY "Educators can view milestones for goals they assigned"
  ON goal_milestones
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_goals
      WHERE user_goals.id = goal_milestones.goal_id AND user_goals.assigned_by = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all milestones"
  ON goal_milestones
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- User schedules policies
CREATE POLICY "Users can view their own schedules"
  ON user_schedules
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own schedules"
  ON user_schedules
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own schedules"
  ON user_schedules
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Educators can view schedules they created"
  ON user_schedules
  FOR SELECT
  USING (auth.uid() = created_by);

CREATE POLICY "Admins can manage all schedules"
  ON user_schedules
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Schedule requests policies
CREATE POLICY "Users can view their own schedule requests"
  ON schedule_requests
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own schedule requests"
  ON schedule_requests
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Educators can view all schedule requests"
  ON schedule_requests
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Admins can manage all schedule requests"
  ON schedule_requests
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Online classes policies
CREATE POLICY "Users can view classes they are invited to"
  ON online_classes
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM class_attendees
      WHERE class_attendees.class_id = online_classes.id AND class_attendees.user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM group_members
      WHERE group_members.group_id = online_classes.group_id AND group_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Educators can create classes"
  ON online_classes
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Educators can update classes they created"
  ON online_classes
  FOR UPDATE
  USING (
    auth.uid() = created_by AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Admins can manage all classes"
  ON online_classes
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Class attendees policies
CREATE POLICY "Users can view their own attendance"
  ON class_attendees
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Educators can view attendees for classes they created"
  ON class_attendees
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM online_classes
      WHERE online_classes.id = class_attendees.class_id AND online_classes.created_by = auth.uid()
    )
  );

CREATE POLICY "Educators can manage attendees for classes they created"
  ON class_attendees
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM online_classes
      WHERE online_classes.id = class_attendees.class_id AND online_classes.created_by = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all attendees"
  ON class_attendees
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );