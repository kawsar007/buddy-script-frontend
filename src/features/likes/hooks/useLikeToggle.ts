'use client';

import { queryKeys } from '@/src/lib/constants/query-keys';
import { getErrorMessage } from '@/src/lib/utils/get-error-message';
import { ApiError } from '@/src/types/api.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { likesApi } from '../api/likes.api';
import type { LikeTargetType } from '../types/like.types';

function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'statusCode' in error;
}

export function useLikeToggle(targetType: LikeTargetType, targetId: number) {
  const queryClient = useQueryClient();
  const countKey =
    targetType === 'post'
      ? [...queryKeys.likes.postLikers(targetId), 'count']
      : [...queryKeys.likes.commentLikers(targetId), 'count'];

  const countQuery = useQuery({
    queryKey: countKey,
    queryFn: async () => {
      const result =
        targetType === 'post'
          ? await likesApi.listPostLikers(targetId, 1, 1)
          : await likesApi.listCommentLikers(targetId, 1, 1);
      return result.meta.total;
    },
    staleTime: 30_000,
  });

  const [liked, setLiked] = useState(false);

  const mutation = useMutation({
    mutationFn: () => {
      if (targetType === 'post') {
        return liked ? likesApi.unlikePost(targetId) : likesApi.likePost(targetId);
      }
      return liked ? likesApi.unlikeComment(targetId) : likesApi.likeComment(targetId);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: countKey });
      const previousLiked = liked;
      const previousCount = queryClient.getQueryData<number>(countKey) ?? 0;

      setLiked(!previousLiked);
      queryClient.setQueryData<number>(
        countKey,
        previousCount + (previousLiked ? -1 : 1),
      );

      return { previousLiked, previousCount };
    },
    onError: (error, _vars, context) => {
      if (!context) return;
      const apiError = isApiError(error)
        ? error
        : { statusCode: 0, message: error.message };

      if (!context.previousLiked && apiError.statusCode === 409) {
        setLiked(true); // was already liked — not a real error
      } else if (context.previousLiked && apiError.statusCode === 404) {
        setLiked(false); // was already unliked — not a real error
      } else {
        setLiked(context.previousLiked);
        toast.error(getErrorMessage(error));
      }
      queryClient.invalidateQueries({ queryKey: countKey });
    },
    onSuccess: (result) => {
      queryClient.setQueryData<number>(countKey, result.likesCount);
    },
  });

  return {
    liked,
    count: countQuery.data ?? 0,
    isCountLoading: countQuery.isLoading,
    toggle: () => mutation.mutate(),
    isToggling: mutation.isPending,
  };
}
