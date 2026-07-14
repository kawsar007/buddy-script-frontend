'use client';
import { clearSession as clearApiSession } from '@/src/lib/api/axios';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { authApi } from '../features/auth/api/auth.api';
import { AuthResponse, User } from '../features/auth/types/auth.types';
import { tokenStore } from '../lib/api/token-store';
import { queryKeys } from '../lib/constants/query-keys';
import { ROUTES } from '../lib/constants/routes';
import { AUTH_COOKIE_NAME, STORAGE_KEYS } from '../lib/constants/storage';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setSession: (auth: AuthResponse) => void;
  updateCachedUser: (updates: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const THIRTY_DAYS_SECONDS = 60 * 60 * 24 * 30;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hasToken, setHasToken] = useState(() => tokenStore.getAccessToken() !== null);
  const [isRestoring, setIsRestoring] = useState(true);
  const queryClient = useQueryClient();
  const router = useRouter();

  // The axios refresh interceptor can update the token outside of any React
  // event 
  useEffect(() => tokenStore.subscribe((token) => setHasToken(token !== null)), []);

  const setSession = useCallback(
    (auth: AuthResponse) => {
      tokenStore.setAccessToken(auth.accessToken);
      localStorage.setItem(STORAGE_KEYS.refreshToken, auth.refreshToken);
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(auth.user));
      document.cookie = `${AUTH_COOKIE_NAME}=1; path=/; max-age=${THIRTY_DAYS_SECONDS}; samesite=lax`;
      setUser(auth.user);
      queryClient.setQueryData(queryKeys.auth.currentUser(), auth.user);
    },
    [queryClient],
  );

  const updateCachedUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(next));
      return next;
    });
  }, []);

  const logout = useCallback(() => {
    clearApiSession();
    setUser(null);
    queryClient.clear();
    router.push(ROUTES.login);
  }, [queryClient, router]);

  useEffect(() => {
    const cachedUserRaw = localStorage.getItem(STORAGE_KEYS.user);
    if (cachedUserRaw) {
      try {
        setUser(JSON.parse(cachedUserRaw) as User);
      } catch {
        localStorage.removeItem(STORAGE_KEYS.user);
      }
    }

    const refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken);
    if (!refreshToken) {
      setIsRestoring(false);
      return;
    }

    authApi
      .refresh(refreshToken)
      .then(setSession)
      .catch(() => {
        clearApiSession();
        setUser(null);
      })
      .finally(() => setIsRestoring(false));
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: hasToken && user !== null,
    isLoading: isRestoring,
    setSession,
    updateCachedUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
