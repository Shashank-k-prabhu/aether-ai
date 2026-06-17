/**
 * seed-admin.mjs
 * Run once to insert the admin account into MongoDB.
 *
 * Usage:
 *   node scripts/seed-admin.mjs
 *
 * Requires MONGODB_URI to be set in .env.local (loaded via dotenv).
 */

import { config } from 'dotenv';
import { createRequire } from 'module';

// Load .env.local
config({ path: '.env.local' });

const require = createRequire(import.meta.url);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI is not set in .env.local');
  process.exit(1);
}

// ── Schema (mirrors src/models/User.ts) ──────────────────────────────────────
const UserSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role:     { type: String, enum: ['admin', 'user'], default: 'user' },
  },
  { timestamps: true }
);

const User = mongoose.models.User ?? mongoose.model('User', UserSchema);

// ── Seed Data ─────────────────────────────────────────────────────────────────
const ADMIN = {
  name:     'Aether Admin',
  email:    'admin@aether.ai',
  password: 'Admin@123',   // ← plain-text; will be hashed below
  role:     'admin',
};

const DEMO_USER = {
  name:     'Demo User',
  email:    'user@aether.ai',
  password: 'User@123',
  role:     'user',
};

// ── Main ──────────────────────────────────────────────────────────────────────
async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅  Connected to MongoDB');

    for (const account of [ADMIN, DEMO_USER]) {
      const existing = await User.findOne({ email: account.email });

      if (existing) {
        console.log(`⚠️   ${account.email} already exists — skipping`);
        continue;
      }

      const hashed = await bcrypt.hash(account.password, 12);
      await User.create({ ...account, password: hashed });
      console.log(`✅  Created ${account.role}: ${account.email} / ${account.password}`);
    }

    console.log('\n🎉  Seed complete! Use the credentials above to log in.\n');
  } catch (err) {
    console.error('❌  Seed failed:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
