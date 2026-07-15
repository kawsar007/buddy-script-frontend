import { PostVisibility } from "../features/feed/types/post.types";
import { PublicUser } from "../features/users/types/user.types";

export interface Person {
  id: string;
  name: string;
  role: string;
  image: string;
  online?: boolean;
}

export interface Story {
  id: string;
  name: string;
  isOwn?: boolean;
  image?: string;
}

export interface PostAuthor {
  id: string;
  name: string;
  role: string;
}

export interface PostContent {
  id: number;
  content: string;
  imageUrl: string | null;
  visibility: PostVisibility;
  author: PublicUser;
  createdAt: string;
  updatedAt: string;
}

export interface Recommendation {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  attendees: number;
  image: string;
}

export interface NavItem {
  id: string;
  label: string;
  badge?: "New";
}
