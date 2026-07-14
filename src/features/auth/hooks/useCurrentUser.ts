'use client';

import { queryKeys } from '@/src/lib/constants/query-keys';
import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../../users/api/users.api';

export function useCurrentUser(enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.auth.currentUser(),
    queryFn: usersApi.getCurrentUser,
    enabled,
    staleTime: 60 * 1000,
  });
}
