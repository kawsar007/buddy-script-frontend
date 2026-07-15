'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '../api/posts.api';
// import { queryKeys } from '@/lib/constants/query-keys';
import { queryKeys } from '@/src/lib/constants/query-keys';
import {
  getPostsSnapshot,
  removePostFromCache,
  restorePostsSnapshot,
} from './post-cache';

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => postsApi.remove(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.posts.list() });
      const snapshot = getPostsSnapshot(queryClient);
      removePostFromCache(queryClient, id);
      return { snapshot };
    },
    onError: (_err, _id, context) => {
      if (context) restorePostsSnapshot(queryClient, context.snapshot);
    },
  });
}
