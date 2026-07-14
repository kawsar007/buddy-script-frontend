/**
 * Centralized query key factory. Every feature imports from here
 */
export const queryKeys = {
  auth: {
    currentUser: () => ['auth', 'currentUser'] as const,
  },
} as const;
