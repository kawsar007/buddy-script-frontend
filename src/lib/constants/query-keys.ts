/**
 * Centralized query key factory. Every feature imports from here
 */

export const queryKeys = {
  auth: {
    currentUser: () => ['auth', 'currentUser'] as const,
  },
  posts: {
    all: () => ['posts'] as const,
    list: () => ['posts', 'list'] as const,
  },
  comments: {
    all: () => ['comments'] as const,
    byPost: (postId: number) => ['comments', 'post', postId] as const,
    replies: (commentId: number) => ['comments', 'replies', commentId] as const,
  },
  likes: {
    postLikers: (postId: number) => ['likes', 'post', postId] as const,
    commentLikers: (commentId: number) => ['likes', 'comment', commentId] as const,
  },
} as const;