-- Migration to create the jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  employer_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  functional_area TEXT NOT NULL,
  industry TEXT NOT NULL,
  description TEXT NOT NULL,
  vacancies INTEGER DEFAULT 1,
  exp_min INTEGER,
  exp_max INTEGER,
  sal_min INTEGER,
  sal_max INTEGER,
  country TEXT,
  state TEXT,
  city TEXT,
  ug_qualification TEXT,
  pg_qualification TEXT,
  skills TEXT, -- stored as JSON stringified array
  status TEXT DEFAULT 'active', -- 'active', 'draft', 'expired'
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (employer_id) REFERENCES users(id) ON DELETE CASCADE
);
