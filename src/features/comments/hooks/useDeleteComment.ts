'use client';

import { queryKeys } from '@/src/lib/constants/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsApi } from '../api/comments.api';

export function useDeleteComment(postId: number, parentId: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => commentsApi.remove(id),
    onSuccess: () => {
      const key = parentId
        ? queryKeys.comments.replies(parentId)
        : queryKeys.comments.byPost(postId);
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
}
