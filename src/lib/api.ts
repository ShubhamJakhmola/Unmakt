export interface ApiUser {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthResponse {
  user: ApiUser;
  token: string;
}

const FUNCTIONS_BASE = '/.netlify/functions';

const request = async <T>(
  path: string,
  options?: RequestInit & { token?: string }
): Promise<T> => {
  const headers = new Headers(options?.headers);
  headers.set('Content-Type', 'application/json');

  if (options?.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  const res = await fetch(`${FUNCTIONS_BASE}/${path}`, {
    ...options,
    headers,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
};

export const apiLogin = (email: string, password: string) =>
  request<AuthResponse>('auth-login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const apiRegister = (email: string, password: string, adminCode?: string) =>
  request<AuthResponse>('auth-register', {
    method: 'POST',
    body: JSON.stringify({ email, password, adminCode }),
  });

export const apiMe = (token: string) =>
  request<{ user: ApiUser }>('auth-me', {
    method: 'GET',
    token,
  });

