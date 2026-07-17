#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -euo pipefail

# Start directory (defaults to current directory if not provided)
TARGET_DIR="${1:-.}"

# Find all non-hidden files and count their lines using wc -l
# -name '.*' -prune skips any directory or file starting with a dot
# -type f filters for regular files only
# -print0 combined with xargs -0 ensures filenames with spaces or special characters are handled safely
find "$TARGET_DIR" -mindepth 1 -name '.*' -prune -o -type f -print0 | xargs -0 wc -l