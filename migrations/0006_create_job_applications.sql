-- Migration to create the job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id INTEGER NOT NULL,
  jobseeker_id INTEGER NOT NULL,
  status TEXT DEFAULT 'applied', -- 'applied', 'shortlisted', 'rejected', 'offered'
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (jobseeker_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(job_id, jobseeker_id)
);
