import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/authService';
import {
  getToken,
  setToken,
  setStoredUser,
  clearAuthStorage,
  getStoredUser,
} from '../utils/storage';
import { ROLES } from '../utils/constants';

const AuthContext = createContext(null);

function normalizeUser(userData) {
  if (!userData) return userData;
  return { ...userData, role: String(userData.role || '').toLowerCase() };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const persistSession = useCallback((token, userData, remember = true) => {
    const next = normalizeUser(userData);
    setToken(token, remember);
    setStoredUser(next, remember);
    setUser(next);
  }, []);

  const bootstrap = useCallback(async () => {
    const token = getToken();
    const stored = getStoredUser();
    if (!token || !stored) {
      setLoading(false);
      setInitialized(true);
      return;
    }
    try {
      const freshUser = normalizeUser(await authService.fetchCurrentUser());
      setUser(freshUser);
      setStoredUser(freshUser, !!localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY || 'royale_rent_token'));
    } catch {
      clearAuthStorage();
      setUser(null);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const login = async (credentials, remember = true) => {
    const { token, user: userData } = await authService.login(credentials);
    persistSession(token, userData, remember);
    return userData;
  };

  const register = async (payload, remember = true) => {
    const { token, user: userData } = await authService.register(payload);
    persistSession(token, userData, remember);
    return userData;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      clearAuthStorage();
      setUser(null);
    }
  };

  const updateUser = (updates) => {
    const next = normalizeUser({ ...user, ...updates });
    setUser(next);
    const persist = !!localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY || 'royale_rent_token');
    setStoredUser(next, persist);
  };

  const isAuthenticated = !!user && !!getToken();
  const isCustomer = user?.role === ROLES.CUSTOMER;
  const isOwner = user?.role === ROLES.OWNER;
  const isAdmin = user?.role === ROLES.ADMIN;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        initialized,
        isAuthenticated,
        isCustomer,
        isOwner,
        isAdmin,
        login,
        register,
        logout,
        updateUser,
        bootstrap,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
