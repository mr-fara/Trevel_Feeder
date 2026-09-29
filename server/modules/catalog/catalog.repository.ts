import {pool} from '../../db/pool.ts';

export async function getDocuments() {
  const result = await pool.query<{document_key: string; payload: unknown}>(
    'SELECT document_key, payload FROM content_documents',
  );
  return Object.fromEntries(result.rows.map(({document_key, payload}) => [document_key, payload]));
}

export async function getDocument(documentKey: string) {
  const result = await pool.query<{payload: unknown}>(
    'SELECT payload FROM content_documents WHERE document_key = $1',
    [documentKey],
  );
  return result.rows[0]?.payload;
}