# D1 Database Setup - Execute These Commands One at a Time

## Instructions
Copy and execute each command separately in the D1 Console. Wait for each to complete before running the next.

## Command 1: Create Users Table
```sql
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('student', 'educator', 'admin', 'school')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT DEFAULT '{}'
);
```

## Command 2: Create Schools Table
```sql
CREATE TABLE IF NOT EXISTS schools (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT,
  country TEXT,
  subscription_type TEXT DEFAULT 'basic',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Command 3: Create Students Table
```sql
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL,
  school_id TEXT,
  grade_level TEXT,
  subscription_type TEXT DEFAULT 'basic',
  parent_email TEXT,
  parent_phone TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Command 4: Create Educators Table
```sql
CREATE TABLE IF NOT EXISTS educators (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL,
  school_id TEXT,
  subject_areas TEXT,
  qualification TEXT,
  experience_years INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Command 5: Create Resources Table
```sql
CREATE TABLE IF NOT EXISTS resources (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK(type IN ('video', 'document', 'quiz', 'assignment', 'article')),
  subject TEXT,
  grade_level TEXT,
  content_url TEXT,
  metadata TEXT DEFAULT '{}',
  created_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Command 6: Create AI Chat History Table
```sql
CREATE TABLE IF NOT EXISTS ai_chat_history (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  metadata TEXT DEFAULT '{}',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Command 7: Create AI Search History Table
```sql
CREATE TABLE IF NOT EXISTS ai_search_history (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL,
  query TEXT NOT NULL,
  results TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Command 8: Create Messages Table
```sql
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  sender_id TEXT NOT NULL,
  recipient_id TEXT NOT NULL,
  content TEXT NOT NULL,
  is_read INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Command 9: Create Waitlist Table
```sql
CREATE TABLE IF NOT EXISTS waitlist (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('student', 'school')),
  country TEXT,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Command 10: Create Sessions Table
```sql
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Command 11: Create Indexes
```sql
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_id);
```

## Command 12: Insert Demo Users
```sql
INSERT OR IGNORE INTO users (id, email, password_hash, full_name, role) VALUES 
('demo-student-1', 'demo.student@tutokitulo.africa', '925f43c5c71e5fc152fefd8129ab17bc879f59bf02de348deb88de7598f30c76', 'Alex Johnson', 'student');
```

```sql
INSERT OR IGNORE INTO users (id, email, password_hash, full_name, role) VALUES 
('demo-educator-1', 'demo.educator@tutokitulo.africa', '0e5751b834c52b099d0d433f957a3e17c18351ea36dc81bcdf9f829fb7f3364e', 'Dr. Sarah Wilson', 'educator');
```

```sql
INSERT OR IGNORE INTO users (id, email, password_hash, full_name, role) VALUES 
('demo-admin-1', 'admin@tutokitulo.africa', 'd82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892', 'Michael Chen', 'admin');
```

## ✅ Verification
After running all commands, run this to verify:
```sql
SELECT name FROM sqlite_master WHERE type='table';
```

This should show all the tables created.

Then verify demo users:
```sql
SELECT email, full_name, role FROM users;
```

## 📝 Notes
- D1 uses SQLite, so we use INTEGER instead of BOOLEAN
- Foreign keys are supported but not enforced by default in SQLite
- The demo user passwords are hashed versions of:
  - student123
  - educator123
  - admin123