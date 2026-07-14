export interface PublicUser {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  bio: string | null;
  createdAt: string;
}
export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatarUrl?: string;
}
