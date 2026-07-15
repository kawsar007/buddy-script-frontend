'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '../api/posts.api';
import type { CreatePostInput } from '../types/post.types';
import { prependPostToCache } from './post-cache';

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePostInput) => postsApi.create(input),
    onSuccess: (post) => {
      prependPostToCache(queryClient, post);
    },
  });
}
