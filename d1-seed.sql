-- Seed data for Tulo Afrika D1 database

-- Demo users
INSERT OR IGNORE INTO users (id, email, password_hash, full_name, role, metadata)
VALUES
  ('demo-user-student', 'student@demo.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Demo Student', 'student', '{}'),
  ('demo-user-educator', 'educator@demo.com', '8b63e068a4a693ecd45d4fa1ed988fb8f2f4f42d20a42072c81bd06140d4dc5d', 'Demo Educator', 'educator', '{}'),
  ('demo-user-admin', 'admin@demo.com', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'Demo Admin', 'admin', '{}');

-- Demo student profile
INSERT OR IGNORE INTO students (id, user_id, grade_level, subscription_type, parent_email, parent_phone)
VALUES
  ('demo-student-profile', 'demo-user-student', 'Grade 10', 'premium', 'guardian@demo.com', '+00000000000');

-- Demo educator profile
INSERT OR IGNORE INTO educators (id, user_id, subject_areas, qualification, experience_years)
VALUES
  ('demo-educator-profile', 'demo-user-educator', 'Mathematics, Science', 'B.Ed', 8);

-- Sample resources
INSERT OR IGNORE INTO resources (id, title, description, type, subject, grade_level, content_url, metadata, created_by)
VALUES
  ('demo-resource-1', 'Introduction to Algebra', 'Foundational algebra concepts with practice questions.', 'article', 'Mathematics', 'Grade 10', 'https://example.com/resources/algebra-intro', '{"tags": ["math", "algebra"]}', 'demo-user-educator'),
  ('demo-resource-2', 'African History Overview', 'Interactive lesson plan covering key historical events.', 'document', 'History', 'Grade 11', 'https://example.com/resources/african-history', '{"tags": ["history", "africa"]}', 'demo-user-educator');

-- Waitlist entry sample
INSERT OR IGNORE INTO waitlist (id, name, email, type, country, message)
VALUES
  ('demo-waitlist-1', 'Amina Adeola', 'amina@example.com', 'student', 'Nigeria', 'Excited to join the AI tutor beta.');
