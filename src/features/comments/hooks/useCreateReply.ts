'use client';

import { queryKeys } from '@/src/lib/constants/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsApi } from '../api/comments.api';

export function useCreateReply(postId: number, parentCommentId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => commentsApi.reply(parentCommentId, content),
    onSuccess: () => {
      // The new reply itself:
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.replies(parentCommentId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.byPost(postId) });
    },
  });
}
