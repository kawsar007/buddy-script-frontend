'use client';

import { useQuery } from '@tanstack/react-query';
import { usersApi } from '@/features/users/api/users.api';
import { queryKeys } from '@/lib/constants/query-keys';

/**
 * `enabled` is caller-controlled (see AuthContext) rather than always-on,
 * because firing this on every mount — including on /login before any
 * token exists — would guarantee a 401 and trigger the axios refresh
 * interceptor for no reason.
 */
export function useCurrentUser(enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.auth.currentUser(),
    queryFn: usersApi.getCurrentUser,
    enabled,
    staleTime: 60 * 1000,
  });
}
