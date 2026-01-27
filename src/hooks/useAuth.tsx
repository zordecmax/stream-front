'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type AuthState = {
  accessToken: string | null;
  userEmail: string | null;
};

type LoginPayload = { email: string; password: string };
type RegisterPayload = { email: string; password: string; name: string };

type AuthContextValue = AuthState & {
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_STORAGE_KEY = 'HYPE_auth_token';
const AUTH_EMAIL_KEY = 'HYPE_auth_email';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Load from localStorage on mount
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem(AUTH_STORAGE_KEY);
      const email = window.localStorage.getItem(AUTH_EMAIL_KEY);
      // Schedule state updates to avoid synchronous cascading renders
      Promise.resolve().then(() => {
        if (token) setAccessToken(token);
        if (email) setUserEmail(email);
      });
    }
  }, []);

  const persist = useCallback((token: string | null, email?: string | null) => {
    if (typeof window === 'undefined') return;
    if (token) window.localStorage.setItem(AUTH_STORAGE_KEY, token);
    else window.localStorage.removeItem(AUTH_STORAGE_KEY);
    if (email) window.localStorage.setItem(AUTH_EMAIL_KEY, email);
    else window.localStorage.removeItem(AUTH_EMAIL_KEY);
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const res = await fetch('https://stream-be.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    const token = data.accessToken as string;
    setAccessToken(token);
    setUserEmail(payload.email);
    persist(token, payload.email);
  }, [persist]);

  const register = useCallback(async (payload: RegisterPayload) => {
    const res = await fetch('https://stream-be.onrender.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Registration failed');
    const data = await res.json();
    const token = data.accessToken as string;
    setAccessToken(token);
    setUserEmail(payload.email);
    persist(token, payload.email);
  }, [persist]);

  const logout = useCallback(() => {
    setAccessToken(null);
    setUserEmail(null);
    persist(null, null);
  }, [persist]);

  const value = useMemo<AuthContextValue>(() => ({ accessToken, userEmail, login, register, logout }), [accessToken, userEmail, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
