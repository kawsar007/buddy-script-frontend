import { PublicUser } from "../../users/types/user.types";

export interface Comment {
  id: number;
  content: string;
  postId: number;
  parentId: number | null;
  author: PublicUser;
  repliesCount: number;
  createdAt: string;
  updatedAt: string;
}
