import { Env, User, Session } from '../types';
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  // For Cloudflare Workers, we'll use a simple hash for now
  // In production, use proper bcrypt or argon2
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

export function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function createSession(userId: string, env: Env): Promise<Session> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  const session = await env.DB.prepare(
    'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?) RETURNING *'
  ).bind(userId, token, expiresAt.toISOString()).first() as Session;
  
  // Also store in KV for faster access
  await env.SESSIONS.put(token, JSON.stringify({ userId, expiresAt: expiresAt.toISOString() }), {
    expirationTtl: 7 * 24 * 60 * 60 // 7 days in seconds
  });
  
  return session;
}

export async function verifyToken(token: string, env: Env): Promise<User | null> {
  // First check KV for faster access
  const kvSession = await env.SESSIONS.get(token);
  if (kvSession) {
    const sessionData = JSON.parse(kvSession);
    if (new Date(sessionData.expiresAt) > new Date()) {
      const user = await env.DB.prepare(
        'SELECT * FROM users WHERE id = ?'
      ).bind(sessionData.userId).first() as User;
      return user;
    }
  }
  
  // Fallback to database
  const session = await env.DB.prepare(
    'SELECT * FROM sessions WHERE token = ? AND expires_at > datetime("now")'
  ).bind(token).first() as Session;
  
  if (!session) return null;
  
  const user = await env.DB.prepare(
    'SELECT * FROM users WHERE id = ?'
  ).bind(session.user_id).first() as User;
  
  return user;
}

export async function deleteSession(token: string, env: Env): Promise<void> {
  await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
  await env.SESSIONS.delete(token);
}