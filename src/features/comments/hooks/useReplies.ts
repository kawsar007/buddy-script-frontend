'use client';

import { queryKeys } from '@/src/lib/constants/query-keys';
import { useInfiniteQuery } from '@tanstack/react-query';
import { commentsApi } from '../api/comments.api';

const REPLIES_PAGE_SIZE = 10;

export function useReplies(commentId: number, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: queryKeys.comments.replies(commentId),
    queryFn: ({ pageParam }) =>
      commentsApi.listReplies(commentId, pageParam, REPLIES_PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    enabled,
  });
}
