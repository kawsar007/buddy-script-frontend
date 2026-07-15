
import { PublicUser } from "../../users/types/user.types";

export type PostVisibility = 'PUBLIC' | 'PRIVATE';

export interface Post {
  id: number;
  content: string;
  imageUrl: string | null;
  visibility: PostVisibility;
  author: PublicUser;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostInput {
  content: string;
  visibility: PostVisibility;
  image?: File;
}

export interface UpdatePostInput {
  content?: string;
  visibility?: PostVisibility;
  image?: File;
}
