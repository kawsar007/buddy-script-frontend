
import { AuthResponse } from '@/src/features/auth/types/auth.types';
import { ApiError, ApiErrorResponse, ApiSuccessResponse } from '@/src/types/api.types';
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { AUTH_COOKIE_NAME, STORAGE_KEYS } from '../constants/storage';
import { tokenStore } from './token-store';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStore.getAccessToken();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken =
    typeof window !== 'undefined'
      ? localStorage.getItem(STORAGE_KEYS.refreshToken)
      : null;

  if (!refreshToken) return null;

  try {
    const response = await axios.post<ApiSuccessResponse<AuthResponse>>(
      `${API_BASE_URL}/auth/refresh`,
      { refreshToken },
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    tokenStore.setAccessToken(accessToken);
    localStorage.setItem(STORAGE_KEYS.refreshToken, newRefreshToken);
    return accessToken;
  } catch {
    clearSession();
    return null;
  }
}

/** Clears every trace of the session — called on refresh failure or explicit logout. */
export function clearSession(): void {
  tokenStore.setAccessToken(null);
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.refreshToken);
    localStorage.removeItem(STORAGE_KEYS.user);
    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0`;
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as RetryableConfig | undefined;
    const url = originalRequest?.url ?? '';
    const isAuthEndpoint = ['/auth/login', '/auth/register', '/auth/refresh'].some((p) =>
      url.includes(p),
    );

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });

      const newToken = await refreshPromise;
      if (newToken) {
        originalRequest.headers.set('Authorization', `Bearer ${newToken}`);
        return apiClient(originalRequest);
      }
    }

    return Promise.reject(normalizeError(error));
  },
);

function normalizeError(error: AxiosError<ApiErrorResponse>): ApiError {
  if (error.response?.data) {
    const { message, errors, statusCode } = error.response.data;
    return { statusCode, message, errors };
  }
  if (error.request) {
    return {
      statusCode: 0,
      message: 'Unable to reach the server. Check your connection and try again.',
    };
  }
  return { statusCode: 0, message: error.message || 'An unexpected error occurred.' };
}
