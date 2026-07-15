import { apiDelete, apiGetPaginated, apiPost } from '@/src/lib/api/http';
import type { LikeActionResult, Liker } from '../types/like.types';

export const likesApi = {
  likePost: (postId: number) => apiPost<LikeActionResult>(`/posts/${postId}/like`),
  unlikePost: (postId: number) => apiDelete<LikeActionResult>(`/posts/${postId}/like`),
  listPostLikers: (postId: number, page: number, limit = 10) =>
    apiGetPaginated<Liker>(`/posts/${postId}/likes`, { params: { page, limit } }),

  likeComment: (commentId: number) =>
    apiPost<LikeActionResult>(`/comments/${commentId}/like`),
  unlikeComment: (commentId: number) =>
    apiDelete<LikeActionResult>(`/comments/${commentId}/like`),
  listCommentLikers: (commentId: number, page: number, limit = 10) =>
    apiGetPaginated<Liker>(`/comments/${commentId}/likes`, { params: { page, limit } }),
};
