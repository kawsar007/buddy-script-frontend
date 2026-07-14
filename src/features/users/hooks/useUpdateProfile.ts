'use client';

import { useAuth } from '@/src/contexts/AuthContext';
import { queryKeys } from '@/src/lib/constants/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../api/users.api';
import type { UpdateProfileInput } from '../types/user.types';

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { updateCachedUser } = useAuth();

  return useMutation({
    mutationFn: (payload: UpdateProfileInput) => usersApi.updateProfile(payload),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKeys.auth.currentUser(), updatedUser);
      updateCachedUser(updatedUser);
    },
  });
}
