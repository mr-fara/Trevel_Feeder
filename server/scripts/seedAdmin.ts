import {hash} from 'bcryptjs';
import {env} from '../config/env.ts';
import {pool} from '../db/pool.ts';
import {seedAdmin} from '../modules/admin/admin.repository.ts';

try {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD || env.ADMIN_PASSWORD.length < 12) {
    throw new Error('Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters in .env first.');
  }

  const passwordHash = await hash(env.ADMIN_PASSWORD, 12);
  const admin = await seedAdmin(env.ADMIN_EMAIL, passwordHash);
  console.log(`Seeded admin account: ${admin.email}`);
} catch (error) {
  console.error('Admin seed failed:', error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
