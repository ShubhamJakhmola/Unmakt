import { createContext, useContext, useEffect, useState } from 'react';
import { apiLogin, apiRegister, apiMe, type ApiUser } from '../lib/api';

interface AuthContextValue {
  user: ApiUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, adminCode?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'unmakt_auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setLoading(false);
      return;
    }
    const parsed = JSON.parse(stored) as { token: string };
    if (!parsed.token) {
      setLoading(false);
      return;
    }
    apiMe(parsed.token)
      .then(({ user: me }) => {
        setUser(me);
        setToken(parsed.token);
      })
      .catch(() => {
        localStorage.removeItem(STORAGE_KEY);
      })
      .finally(() => setLoading(false));
  }, []);

  const persist = (nextToken: string, nextUser: ApiUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: nextToken }));
    setToken(nextToken);
    setUser(nextUser);
  };

  const login = async (email: string, password: string) => {
    const { token: nextToken, user: nextUser } = await apiLogin(email, password);
    persist(nextToken, nextUser);
  };

  const register = async (email: string, password: string, adminCode?: string) => {
    const { token: nextToken, user: nextUser } = await apiRegister(email, password, adminCode);
    persist(nextToken, nextUser);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};

