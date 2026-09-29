import {readdir, readFile} from 'node:fs/promises';
import {pool} from './pool.ts';
import {catalog} from '../modules/catalog/catalog.data.ts';

try {
  await pool.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
    filename VARCHAR(160) PRIMARY KEY,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`);

  const migrationDirectory = new URL('./migrations/', import.meta.url);
  const migrations = (await readdir(migrationDirectory)).filter((filename) => filename.endsWith('.sql')).sort();
  for (const filename of migrations) {
    const existing = await pool.query('SELECT 1 FROM schema_migrations WHERE filename = $1', [filename]);
    if (existing.rowCount) continue;

    const migration = await readFile(new URL(filename, migrationDirectory), 'utf8');
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(migration);
      await client.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [filename]);
      await client.query('COMMIT');
      console.log(`Applied ${filename}.`);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  for (const [key, payload] of Object.entries(catalog)) {
    await pool.query(
      'INSERT INTO content_documents (document_key, payload) VALUES ($1, $2::jsonb) ON CONFLICT (document_key) DO NOTHING',
      [key, JSON.stringify(payload)],
    );
  }
  console.log('Database schema and catalog are up to date.');
} catch (error) {
  console.error('Database migration failed:', error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
