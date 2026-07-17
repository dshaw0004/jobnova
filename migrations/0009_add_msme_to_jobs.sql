-- Migration: Add is_msme flag to jobs table
-- This enables MSME (Micro, Small, and Medium Enterprises) as a distinct job category.

ALTER TABLE jobs ADD COLUMN is_msme INTEGER NOT NULL DEFAULT 0 CHECK (is_msme IN (0, 1));
