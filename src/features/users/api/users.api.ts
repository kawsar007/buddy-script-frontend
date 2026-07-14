import { apiGet, apiPatch } from '@/src/lib/api/http';
import { User } from '../../auth/types/auth.types';
import type { PublicUser, UpdateProfileInput } from '../types/user.types';

export const usersApi = {
  getCurrentUser: () => apiGet<User>('/users/me'),
  updateProfile: (payload: UpdateProfileInput) => apiPatch<User>('/users/me', payload),

  getPublicProfile: (id: number | string) => apiGet<PublicUser>(`/users/${id}`),
};
