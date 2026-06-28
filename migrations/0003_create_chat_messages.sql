-- Migration: 0003_create_chat_messages
-- Stores the full conversation log between a jobseeker and the AI interviewer.
-- This allows the session to be saved and resumed later.

CREATE TABLE IF NOT EXISTS chat_messages (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  role       TEXT    NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content    TEXT    NOT NULL,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- Index to efficiently fetch all messages for a user in chronological order
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id_created ON chat_messages (user_id, created_at);
