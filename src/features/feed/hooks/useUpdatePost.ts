'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '../api/posts.api';
import type { UpdatePostInput } from '../types/post.types';
import { updatePostInCache } from './post-cache';

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdatePostInput }) =>
      postsApi.update(id, input),
    onSuccess: (post) => {
      updatePostInCache(queryClient, post.id, () => post);
    },
  });
}
