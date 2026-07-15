'use client';

import { queryKeys } from '@/src/lib/constants/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsApi } from '../api/comments.api';

export function useCreateComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => commentsApi.create(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.byPost(postId) });
    },
  });
}
