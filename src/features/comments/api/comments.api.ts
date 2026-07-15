import { apiDelete, apiGetPaginated, apiPatch, apiPost } from '@/src/lib/api/http';
import type { Comment } from '../types/comment.types';

export const commentsApi = {
  listTopLevel: (postId: number, page: number, limit = 10) =>
    apiGetPaginated<Comment>(`/posts/${postId}/comments`, { params: { page, limit } }),

  listReplies: (commentId: number, page: number, limit = 10) =>
    apiGetPaginated<Comment>(`/comments/${commentId}/replies`, {
      params: { page, limit },
    }),

  create: (postId: number, content: string) =>
    apiPost<Comment>('/comments', { postId, content }),

  reply: (commentId: number, content: string) =>
    apiPost<Comment>(`/comments/${commentId}/reply`, { content }),

  update: (id: number, content: string) =>
    apiPatch<Comment>(`/comments/${id}`, { content }),

  remove: (id: number) => apiDelete<null>(`/comments/${id}`),
};
