import type { Handler } from '@netlify/functions';
import { getSqlClient } from './utils/db';
import { verifyPassword, createToken } from './utils/auth';
import { handleOptions, jsonResponse } from './utils/http';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return handleOptions();
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!email || !password) {
      return jsonResponse(400, { error: 'Email and password are required.' });
    }

    const sql = getSqlClient();
    const result = await sql<
      { id: string; email: string; password_hash: string; role: 'admin' | 'user' }[]
    >`
      SELECT id, email, password_hash, role
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;

    if (!result.length) {
      return jsonResponse(401, { error: 'Invalid credentials.' });
    }

    const user = result[0];
    const isValid = await verifyPassword(password, user.password_hash);

    if (!isValid) {
      return jsonResponse(401, { error: 'Invalid credentials.' });
    }

    const token = createToken({ id: user.id, email: user.email, role: user.role });

    return jsonResponse(200, {
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login error', error);
    return jsonResponse(500, { error: 'Unable to log in right now.' });
  }
};

