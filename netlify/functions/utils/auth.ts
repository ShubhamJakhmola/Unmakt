import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { HandlerEvent } from '@netlify/functions';

const TOKEN_TTL = '7d';

const getSecret = () => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error('AUTH_SECRET is not configured');
  }
  return secret;
};

export const hashPassword = async (password: string) => bcrypt.hash(password, 10);

export const verifyPassword = async (password: string, hash: string) =>
  bcrypt.compare(password, hash);

interface UserClaims {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export const createToken = (user: UserClaims) =>
  jwt.sign(user, getSecret(), { expiresIn: TOKEN_TTL });

export const verifyToken = (token: string): UserClaims => jwt.verify(token, getSecret()) as UserClaims;

export const parseAuthHeader = (header?: string | null) => {
  if (!header) return null;
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) return null;
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
};

export const requireAuth = (event: HandlerEvent, allowedRoles?: Array<'admin' | 'user'>) => {
  const claims = parseAuthHeader(event.headers.authorization || event.headers.Authorization);
  if (!claims) {
    return null;
  }
  if (allowedRoles && !allowedRoles.includes(claims.role)) {
    return null;
  }
  return claims;
};

