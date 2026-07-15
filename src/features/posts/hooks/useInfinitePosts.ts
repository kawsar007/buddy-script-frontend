'use client';

import { queryKeys } from '@/src/lib/constants/query-keys';
import { useInfiniteQuery } from '@tanstack/react-query';
import { postsApi } from '../api/posts.api';

export const POSTS_PAGE_SIZE = 10;

export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: queryKeys.posts.list(),
    queryFn: ({ pageParam }) => postsApi.list(pageParam, POSTS_PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });
}
