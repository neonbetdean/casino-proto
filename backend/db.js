import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DB_PATH || path.join(__dirname, '../data/casino.sqlite');

let db;

export function initDatabase() {
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  console.log(`✅ Database initialized at ${dbPath}`);
  return db;
}

export function getDatabase() {
  if (!db) {
    initDatabase();
  }
  return db;
}

export function closeDatabase() {
  if (db) {
    db.close();
  }
}
