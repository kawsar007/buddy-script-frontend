
import { apiDelete, apiGet, apiGetPaginated, apiPatchForm, apiPostForm } from '@/src/lib/api/http';
import type { CreatePostInput, Post, UpdatePostInput } from '../types/post.types';

function toFormData(input: CreatePostInput | UpdatePostInput): FormData {
  const formData = new FormData();
  if (input.content !== undefined) formData.append('content', input.content);
  if (input.visibility !== undefined) formData.append('visibility', input.visibility);
  if (input.image) formData.append('image', input.image);
  return formData;
}

export const postsApi = {
  list: (page: number, limit = 10) =>
    apiGetPaginated<Post>('/posts', { params: { page, limit } }),

  getById: (id: number) => apiGet<Post>(`/posts/${id}`),

  create: (input: CreatePostInput) => apiPostForm<Post>('/posts', toFormData(input)),

  update: (id: number, input: UpdatePostInput) =>
    apiPatchForm<Post>(`/posts/${id}`, toFormData(input)),

  remove: (id: number) => apiDelete<null>(`/posts/${id}`),
};

// export type { PaginatedResult };
