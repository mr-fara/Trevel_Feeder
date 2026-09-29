import {env} from '../config/env.ts';
import {pool} from '../db/pool.ts';
import {seedAdmin} from '../modules/admin/admin.repository.ts';

const validPasswordHash = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;

try {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD_HASH || !validPasswordHash.test(env.ADMIN_PASSWORD_HASH)) {
    throw new Error('Set ADMIN_EMAIL and a valid bcrypt ADMIN_PASSWORD_HASH in .env first.');
  }

  const admin = await seedAdmin(env.ADMIN_EMAIL, env.ADMIN_PASSWORD_HASH);
  console.log(`Seeded admin account: ${admin.email}`);
} catch (error) {
  console.error('Admin seed failed:', error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
