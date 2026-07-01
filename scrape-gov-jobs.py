import os
import sqlite3
import requests
from bs4 import BeautifulSoup
from datetime import datetime

# Configuration
TARGET_URL = "https://employmentnews.gov.in/newemp/AllJobs.aspx?k=All"
DB_NAME = "govt_jobs.db"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def init_db():
    """Initializes a local database to track previously seen jobs."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            org TEXT,
            post TEXT,
            last_date TEXT,
            scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(org, post, last_date)
        )
    ''')
    conn.commit()
    return conn

def fetch_jobs():
    """Scrapes the live webpage and returns extracted job rows."""
    print(f"[{datetime.now()}] Fetching job listings from Employment News...")
    try:
        response = requests.get(TARGET_URL, headers=HEADERS, timeout=15)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error accessing portal: {e}")
        return []

    soup = BeautifulSoup(response.content, "html.parser")
    
    # Target the primary data table on the page
    # Note: If the ID changes, adjust the selector to match the target table element
    job_table = soup.find("table") 
    if not job_table:
        print("Could not locate the data table on the webpage.")
        return []

    detected_jobs = []
    rows = job_table.find_all("tr")

    for row in rows[1:]:  # Skip header row
        cols = row.find_all("td")
        if len(cols) >= 5:
            job_data = {
                "issued_date": cols[0].text.strip(),
                "organisation": cols[1].text.strip(),
                "post": cols[2].text.strip(),
                "method": cols[3].text.strip(),
                "last_date": cols[4].text.strip()
            }
            detected_jobs.append(job_data)
            
    return detected_jobs

def process_and_save_new_jobs(jobs, conn):
    """Filters out old listings and saves only new records."""
    cursor = conn.cursor()
    new_jobs_found = []

    for job in jobs:
        try:
            # Check for existing records matching these details
            cursor.execute('''
                INSERT INTO jobs (org, post, last_date) 
                VALUES (?, ?, ?)
            ''', (job["organisation"], job["post"], job["last_date"]))
            
            conn.commit()
            new_jobs_found.append(job)
        except sqlite3.IntegrityError:
            # Entry already exists in database; skip quietly
            continue

    return new_jobs_found

def main():
    db_connection = init_db()
    scraped_data = fetch_jobs()
    
    if scraped_data:
        new_listings = process_and_save_new_jobs(scraped_data, db_connection)
        
        if new_listings:
            print(f"\n🎉 Success! Found {len(new_listings)} brand new job notifications:\n")
            print(f"{'Organisation':<40} | {'Post / Designation':<45} | {'Last Date to Apply'}")
            print("-" * 110)
            for job in new_listings:
                print(f"{job['organisation'][:38]:<40} | {job['post'][:43]:<45} | {job['last_date']}")
            
            # Action Item: You can inject a webhook here to email or message these alerts to yourself.
        else:
            print("\n✅ Check complete. No new job vacancies discovered since the last check.")
            
    db_connection.close()

if __name__ == "__main__":
    main()