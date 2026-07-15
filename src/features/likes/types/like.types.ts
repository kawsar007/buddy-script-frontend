import { PublicUser } from "../../users/types/user.types";

export interface LikeActionResult {
  targetId: number;
  likesCount: number;
}

export interface Liker {
  user: PublicUser;
  likedAt: string;
}

export type LikeTargetType = 'post' | 'comment';
