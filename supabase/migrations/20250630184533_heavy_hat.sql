/*
  # Create initial data for the application

  This migration inserts initial data for:
  1. Default channels for messaging
  2. Initial groups
  3. Sample announcements
*/

-- Insert default channels
INSERT INTO channels (name, description, type, is_private, created_at)
VALUES
  ('general', 'General discussion for everyone', 'text', false, now()),
  ('announcements', 'Important announcements and updates', 'announcement', false, now()),
  ('study-groups', 'Collaborate with classmates', 'text', false, now()),
  ('homework-help', 'Get help with assignments', 'text', false, now()),
  ('faculty-lounge', 'Teacher discussions and collaboration', 'text', true, now()),
  ('curriculum-planning', 'Plan and discuss curriculum', 'text', true, now());

-- Insert initial groups
INSERT INTO groups (name, description, category, is_private, created_at)
VALUES
  ('Mathematics Grade 10', 'Mathematics class for Grade 10 students', 'Mathematics', false, now()),
  ('Physics Grade 11', 'Physics class for Grade 11 students', 'Science', false, now()),
  ('Chemistry Lab', 'Chemistry laboratory sessions', 'Science', false, now()),
  ('Faculty', 'All faculty members', 'Staff', true, now());

-- Insert sample announcements
INSERT INTO announcements (title, message, category, priority, target_group, created_at, expires_at)
VALUES
  ('New AI tutoring features', 'We are excited to announce new AI tutoring features are now available!', 'system', 'high', 'All', now(), now() + interval '30 days'),
  ('Upcoming Maintenance', 'The platform will be briefly unavailable on Sunday from 2-4 AM for updates.', 'system', 'normal', 'All', now(), now() + interval '7 days'),
  ('Math Quiz Tomorrow', 'Reminder: We will have a quiz on quadratic equations tomorrow. Please review chapters 5-7.', 'course', 'high', 'Mathematics Grade 10', now(), now() + interval '2 days');

-- Insert available resources
INSERT INTO resources (title, description, category, type, access_level, url, creator, status, created_at)
VALUES
  ('Khan Academy - Algebra', 'Comprehensive algebra lessons and practice problems', 'Mathematics', 'External Link', 'Free', 'https://www.khanacademy.org/math/algebra', 'Khan Academy', 'active', now()),
  ('Introduction to Python Programming', 'Beginner-friendly Python programming tutorial with hands-on exercises', 'Computer Science', 'External Link', 'Free', 'https://www.python.org/about/gettingstarted/', 'Python.org', 'active', now()),
  ('Advanced Mathematics Course', 'Comprehensive advanced mathematics course covering calculus and linear algebra', 'Mathematics', 'External Link', 'Premium', 'https://example.com/math-course', 'Dr. Sarah Wilson', 'active', now()),
  ('Biology Lab Simulations', 'Virtual biology lab experiments and simulations for remote learning', 'Science', 'External Link', 'Premium', 'https://example.com/biology-lab', 'Dr. Emily Rodriguez', 'active', now());

-- Insert resource access permissions
INSERT INTO resource_access (resource_id, subscription_tier)
VALUES
  ((SELECT id FROM resources WHERE title = 'Khan Academy - Algebra'), 'Free Tier'),
  ((SELECT id FROM resources WHERE title = 'Khan Academy - Algebra'), 'Student Pro'),
  ((SELECT id FROM resources WHERE title = 'Khan Academy - Algebra'), 'Tutor Plus'),
  ((SELECT id FROM resources WHERE title = 'Introduction to Python Programming'), 'Free Tier'),
  ((SELECT id FROM resources WHERE title = 'Introduction to Python Programming'), 'Student Pro'),
  ((SELECT id FROM resources WHERE title = 'Introduction to Python Programming'), 'Tutor Plus'),
  ((SELECT id FROM resources WHERE title = 'Advanced Mathematics Course'), 'Student Pro'),
  ((SELECT id FROM resources WHERE title = 'Advanced Mathematics Course'), 'Tutor Plus'),
  ((SELECT id FROM resources WHERE title = 'Biology Lab Simulations'), 'Tutor Plus');