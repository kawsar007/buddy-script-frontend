/**
 * Centralized route definitions
 */
export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
} as const;

/** Routes that require an authenticated session. */
export const PROTECTED_ROUTES = [ROUTES.dashboard] as const;

/** Routes only reachable by guests (redirect away if already authenticated). */
export const GUEST_ONLY_ROUTES = [ROUTES.login, ROUTES.register] as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
