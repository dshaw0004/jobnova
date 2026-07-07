-- Migration to add expiry_date to jobs table
ALTER TABLE jobs ADD COLUMN expiry_date TEXT;
