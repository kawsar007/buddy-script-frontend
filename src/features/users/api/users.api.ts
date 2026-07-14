import { apiGet } from '@/src/lib/api/http';
import type { User } from '../types/user.types';

export const usersApi = {
  getCurrentUser: () => apiGet<User>('/users/me'),
};
