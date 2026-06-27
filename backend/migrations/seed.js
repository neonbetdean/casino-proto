import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DB_PATH || path.join(__dirname, '../../data/casino.sqlite');

async function seedDatabase() {
  const db = new Database(dbPath);

  // Check if admin already exists
  const adminExists = db.prepare('SELECT id FROM users WHERE username = ?').get('admin_arthur');
  if (adminExists) {
    console.log('✅ Admin user already exists');
    db.close();
    return;
  }

  const bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS, 10) || 10;
  const adminPassword = 'AdminPass123!';
  const passwordHash = await bcryptjs.hash(adminPassword, bcryptRounds);

  const adminId = uuidv4();
  db.prepare(`
    INSERT INTO users (id, username, email, password_hash, balance, is_admin, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `).run(adminId, 'admin_arthur', 'admin@neonbet.local', passwordHash, 50000, 1);

  // Create initial jackpot
  const jackpotId = uuidv4();
  db.prepare(`
    INSERT INTO jackpot (id, total_amount)
    VALUES (?, ?)
  `).run(jackpotId, process.env.JACKPOT_SEED_AMOUNT || 10000);

  db.close();
  console.log('✅ Database seeded with admin user (username: admin_arthur, password: AdminPass123!)');
}

seedDatabase().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
