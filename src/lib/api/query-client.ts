import { ApiError } from '@/src/types/api.types';
import { QueryClient, isServer } from '@tanstack/react-query';
// import type { ApiError } from '@/types/api.types';

function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'statusCode' in error;
}

function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
        retry: (failureCount, error) => {
          // Don't burn retries on errors a retry can never fix.
          if (isApiError(error) && error.statusCode >= 400 && error.statusCode < 500) {
            return false;
          }
          return failureCount < 2;
        },
      },
      mutations: {
        retry: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/**
 * Server: always a new QueryClient (a shared one would leak state between
 * requests). Browser: one client reused across renders, created lazily so
 * it survives React's Strict Mode double-invoke in development.
 */
export function getQueryClient(): QueryClient {
  if (isServer) {
    return makeQueryClient();
  }
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
