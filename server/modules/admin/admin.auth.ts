import {compare, hash} from 'bcryptjs';
import {SignJWT, jwtVerify} from 'jose';
import {env} from '../../config/env.ts';
import * as adminRepository from './admin.repository.ts';

const sessionCookieName = 'travels_feeder_admin';
const sessionDurationSeconds = 60 * 60 * 8;
const signingKey = () => new TextEncoder().encode(env.ADMIN_SESSION_SECRET ?? '');

export function isAdminSessionConfigured(): boolean {
  return Boolean(
    env.ADMIN_SESSION_SECRET
    && env.ADMIN_SESSION_SECRET.length >= 32,
  );
}

export async function verifyAdminCredentials(email: string, password: string) {
  const admin = await adminRepository.findAdminByEmail(email);
  if (!admin?.is_active) return null;

  try {
    if (!await compare(password, admin.password_hash)) return null;
    await adminRepository.recordAdminLogin(admin.id);
    return {id: admin.id, email: admin.email};
  } catch {
    return null;
  }
}

export async function createAdminSession(id: string, email: string): Promise<string> {
  return new SignJWT({email})
    .setProtectedHeader({alg: 'HS256'})
    .setSubject(id)
    .setIssuedAt()
    .setExpirationTime(`${sessionDurationSeconds}s`)
    .sign(signingKey());
}

export async function readAdminSession(token: string): Promise<{id: string; email: string} | null> {
  if (!isAdminSessionConfigured()) return null;
  try {
    const {payload} = await jwtVerify(token, signingKey());
    return typeof payload.sub === 'string' && typeof payload.email === 'string'
      ? {id: payload.sub, email: payload.email}
      : null;
  } catch {
    return null;
  }
}

export async function verifyAdminPassword(id: string, password: string): Promise<boolean> {
  const admin = await adminRepository.findAdminById(id);
  if (!admin?.is_active) return false;
  try {
    return await compare(password, admin.password_hash);
  } catch {
    return false;
  }
}

export const hashAdminPassword = (password: string) => hash(password, 12);

export const adminSessionCookie = {
  name: sessionCookieName,
  maxAge: sessionDurationSeconds,
};
