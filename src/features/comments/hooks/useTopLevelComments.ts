'use client';

import { queryKeys } from '@/src/lib/constants/query-keys';
import { useInfiniteQuery } from '@tanstack/react-query';
import { commentsApi } from '../api/comments.api';

const COMMENTS_PAGE_SIZE = 10;

export function useTopLevelComments(postId: number, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: queryKeys.comments.byPost(postId),
    queryFn: ({ pageParam }) =>
      commentsApi.listTopLevel(postId, pageParam, COMMENTS_PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    enabled,
  });
}
