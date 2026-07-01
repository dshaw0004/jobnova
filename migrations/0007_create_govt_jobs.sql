-- Migration to create the govt_jobs table for scraped listings
CREATE TABLE IF NOT EXISTS govt_jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  issued_date TEXT,
  organisation TEXT NOT NULL,
  post TEXT NOT NULL,
  method TEXT,
  last_date TEXT,
  scraped_at TEXT DEFAULT (datetime('now')),
  UNIQUE(organisation, post, last_date)
);
