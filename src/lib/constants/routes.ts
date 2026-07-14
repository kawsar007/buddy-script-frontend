/**
 * Centralized route definitions
 */
export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  profile: "/profile",
  dashboard: "/dashboard",
} as const;

export const PROTECTED_ROUTES = [ROUTES.dashboard, ROUTES.profile] as const;

export const GUEST_ONLY_ROUTES = [ROUTES.login, ROUTES.register] as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
