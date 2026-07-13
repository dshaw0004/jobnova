-- Migration to create the job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id INTEGER NOT NULL,
  jobseeker_id INTEGER NOT NULL,
  status TEXT DEFAULT 'applied', -- 'applied', 'shortlisted', 'rejected', 'offered'
  cover_letter TEXT,
  ai_screening_completed INTEGER NOT NULL DEFAULT 0 CHECK (ai_screening_completed IN (0, 1)),
  ai_screening_score INTEGER,
  ai_screening_summary TEXT,
  ai_screening_chat_history TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (jobseeker_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(job_id, jobseeker_id)
);
