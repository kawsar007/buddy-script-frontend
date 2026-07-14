/**
 * localStorage keys — hold the refresh token and a minimal cached user
 * object so a page reload can silently re-authenticate. The access token
 * deliberately does NOT live here; see contexts/AuthContext.tsx for why.
 */
export const STORAGE_KEYS = {
  refreshToken: 'sf_refresh_token',
  user: 'sf_user',
  theme: 'sf_theme',
} as const;

/**
 * A non-sensitive, readable cookie that only ever holds "1" or is absent.
 * It carries no token material — it exists purely so proxy.ts (which runs
 * on the server/edge and has no access to localStorage) can make a fast,
 * UX-layer redirect decision for protected routes. The actual security
 * boundary is the backend validating the JWT on every request, not this
 * cookie; see proxy.ts for the full explanation.
 */
export const AUTH_COOKIE_NAME = 'sf_auth';
