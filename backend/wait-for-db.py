#!/usr/bin/env python3
import time
import psycopg2
import os
from urllib.parse import urlparse

def wait_for_db():
    database_url = os.environ.get('DATABASE_URL', 'postgresql://anclora:password@db:5432/anclora_cortex')
    parsed = urlparse(database_url)
    
    max_retries = 30
    retry_count = 0
    
    while retry_count < max_retries:
        try:
            conn = psycopg2.connect(
                host=parsed.hostname,
                port=parsed.port,
                user=parsed.username,
                password=parsed.password,
                database=parsed.path[1:]  # Remove leading slash
            )
            conn.close()
            print("Database is ready!")
            return True
        except psycopg2.OperationalError:
            retry_count += 1
            print(f"Database not ready, retrying... ({retry_count}/{max_retries})")
            time.sleep(2)
    
    print("Database connection failed after maximum retries")
    return False

if __name__ == "__main__":
    wait_for_db()