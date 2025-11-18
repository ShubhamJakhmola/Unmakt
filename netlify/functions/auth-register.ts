import type { Handler } from '@netlify/functions';
import { getSqlClient } from './utils/db';
import { hashPassword, createToken } from './utils/auth';
import { handleOptions, jsonResponse } from './utils/http';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return handleOptions();
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const adminCode = typeof body.adminCode === 'string' ? body.adminCode : null;

    if (!EMAIL_REGEX.test(email)) {
      return jsonResponse(400, { error: 'A valid email is required.' });
    }

    if (password.length < 8) {
      return jsonResponse(400, { error: 'Password must be at least 8 characters.' });
    }

    const sql = getSqlClient();

    const existing = await sql<{ id: string }[]>`SELECT id FROM users WHERE email = ${email}`;
    if (existing.length > 0) {
      return jsonResponse(409, { error: 'Account already exists.' });
    }

    let role: 'admin' | 'user' = 'user';
    if (adminCode && process.env.ADMIN_INVITE_CODE && adminCode === process.env.ADMIN_INVITE_CODE) {
      role = 'admin';
    }

    const passwordHash = await hashPassword(password);
    const [created] = await sql<
      { id: string; email: string; role: 'admin' | 'user'; created_at: string }[]
    >`
      INSERT INTO users (email, password_hash, role)
      VALUES (${email}, ${passwordHash}, ${role})
      RETURNING id, email, role, created_at
    `;

    const token = createToken({ id: created.id, email: created.email, role: created.role });

    return jsonResponse(201, {
      user: {
        id: created.id,
        email: created.email,
        role: created.role,
        createdAt: created.created_at
      },
      token
    });
  } catch (error) {
    console.error('Register error', error);
    return jsonResponse(500, { error: 'Unable to create account right now.' });
  }
};

