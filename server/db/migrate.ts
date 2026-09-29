import {readFile} from 'node:fs/promises';
import {pool} from './pool.ts';
import {catalog} from '../modules/catalog/catalog.data.ts';

try {
  const migration = await readFile(new URL('./migrations/001_create_requests.sql', import.meta.url), 'utf8');
  await pool.query(migration);
  for (const [key, payload] of Object.entries(catalog)) {
    await pool.query(
      'INSERT INTO content_documents (document_key, payload) VALUES ($1, $2::jsonb) ON CONFLICT (document_key) DO NOTHING',
      [key, JSON.stringify(payload)],
    );
  }
  console.log('Database schema is up to date.');
} catch (error) {
  console.error('Database migration failed:', error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
