import {pool} from '../../db/pool.ts';
import type {RequestListQuery} from './admin.schema.ts';

export type EnquiryStatus = 'new' | 'contacted' | 'confirmed' | 'closed';
export type TransferStatus = 'new' | 'confirmed' | 'completed' | 'cancelled';
type RequestTable = 'enquiries' | 'transfer_requests';

export interface AdminAccount {
  id: string;
  email: string;
  password_hash: string;
  is_active: boolean;
}

export async function findAdminByEmail(email: string): Promise<AdminAccount | null> {
  const result = await pool.query<AdminAccount>(
    'SELECT id, email, password_hash, is_active FROM admin_users WHERE LOWER(email) = LOWER($1) LIMIT 1',
    [email.trim()],
  );
  return result.rows[0] ?? null;
}

export async function seedAdmin(email: string, passwordHash: string) {
  const result = await pool.query<{id: string; email: string}>(
    `INSERT INTO admin_users (email, password_hash)
     VALUES (LOWER($1), $2)
     ON CONFLICT (email) DO UPDATE
       SET password_hash = EXCLUDED.password_hash, is_active = TRUE, updated_at = NOW()
     RETURNING id, email`,
    [email.trim(), passwordHash],
  );
  return result.rows[0];
}

export async function recordAdminLogin(id: string): Promise<void> {
  await pool.query('UPDATE admin_users SET last_login_at = NOW() WHERE id = $1', [id]);
}

function buildFilters(query: RequestListQuery) {
  const values: unknown[] = [query.status || null];
  let where = 'WHERE ($1::text IS NULL OR status = $1)';
  if (query.search) {
    values.push(`%${query.search}%`);
    where += ` AND (full_name ILIKE $${values.length} OR email ILIKE $${values.length} OR phone ILIKE $${values.length} OR destination ILIKE $${values.length})`;
  }
  return {values, where};
}

async function listRequests(table: RequestTable, query: RequestListQuery) {
  const {values, where} = buildFilters(query);
  const count = await pool.query<{total: string}>(`SELECT COUNT(*) AS total FROM ${table} ${where}`, values);
  const offset = (query.page - 1) * query.pageSize;
  const pageValues = [...values, query.pageSize, offset];
  const items = await pool.query(
    `SELECT * FROM ${table} ${where} ORDER BY created_at DESC LIMIT $${pageValues.length - 1} OFFSET $${pageValues.length}`,
    pageValues,
  );
  return {items: items.rows, page: query.page, pageSize: query.pageSize, total: Number(count.rows[0].total)};
}

export const listEnquiries = (query: RequestListQuery) => listRequests('enquiries', query);
export const listTransfers = (query: RequestListQuery) => listRequests('transfer_requests', query);

export async function getDashboardStats() {
  const [enquiries, transfers, enquiryStatuses, transferStatuses] = await Promise.all([
    pool.query<{total: string; today: string}>(`SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) AS today FROM enquiries`),
    pool.query<{total: string; today: string}>(`SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) AS today FROM transfer_requests`),
    pool.query<{status: string; total: string}>(`SELECT status, COUNT(*) AS total FROM enquiries GROUP BY status`),
    pool.query<{status: string; total: string}>(`SELECT status, COUNT(*) AS total FROM transfer_requests GROUP BY status`),
  ]);

  return {
    enquiries: {total: Number(enquiries.rows[0].total), today: Number(enquiries.rows[0].today), byStatus: Object.fromEntries(enquiryStatuses.rows.map((row) => [row.status, Number(row.total)]))},
    transfers: {total: Number(transfers.rows[0].total), today: Number(transfers.rows[0].today), byStatus: Object.fromEntries(transferStatuses.rows.map((row) => [row.status, Number(row.total)]))},
  };
}

async function updateStatus(table: RequestTable, id: string, status: string) {
  const result = await pool.query(
    `UPDATE ${table} SET status = $2, updated_at = NOW() WHERE id = $1 RETURNING *`,
    [id, status],
  );
  return result.rows[0] ?? null;
}

export const updateEnquiryStatus = (id: string, status: EnquiryStatus) => updateStatus('enquiries', id, status);
export const updateTransferStatus = (id: string, status: TransferStatus) => updateStatus('transfer_requests', id, status);
