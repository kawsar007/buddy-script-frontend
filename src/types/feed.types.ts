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
  id: string;
  author: PostAuthor;
  timeAgo: string;
  visibility: "Public" | "Friends" | "Only me";
  text: string;
  image?: {
    gradient: string;
    caption: string;
  };
  likeCount: number;
  commentCount: number;
  shareCount: number;
  likedByMe?: boolean;
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
}

export interface NavItem {
  id: string;
  label: string;
  badge?: "New";
}
