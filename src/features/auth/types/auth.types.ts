export type UserRole = 'USER' | 'ADMIN';

/** GET /users/me — never has a password field. */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  role: UserRole;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
