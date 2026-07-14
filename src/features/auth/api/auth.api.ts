import { apiPost } from '@/src/lib/api/http';
import type { LoginFormValues, RegisterFormValues } from '../schemas/auth.schemas';
import type { AuthResponse } from '../types/auth.types';

export const authApi = {
  register: (payload: RegisterFormValues) =>
    apiPost<AuthResponse>('/auth/register', payload),

  login: (payload: LoginFormValues) => apiPost<AuthResponse>('/auth/login', payload),

  refresh: (refreshToken: string) =>
    apiPost<AuthResponse>('/auth/refresh', { refreshToken }),
};
