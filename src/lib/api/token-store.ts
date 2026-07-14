type Listener = (token: string | null) => void;

/**
 * Holds the access token in memory only — never localStorage. Axios
 * interceptors run outside the React tree, so this needs to be a plain
 * module-level store rather than React state; AuthContext subscribes to it
 * to trigger re-renders when the token changes (login, refresh, logout).
 *
 * Why not localStorage for the access token: it's short-lived (15m) and
 * attached to every request automatically via the axios interceptor, so
 * there's no real benefit to persisting it — while doing so would widen
 * the XSS blast radius for zero gain. The refresh token (which DOES need
 * to survive a page reload) lives in localStorage instead; see
 * lib/constants/storage.ts for that trade-off.
 */
let accessToken: string | null = null;
const listeners = new Set<Listener>();

export const tokenStore = {
  getAccessToken: (): string | null => accessToken,

  setAccessToken(token: string | null): void {
    accessToken = token;
    listeners.forEach((listener) => listener(token));
  },

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
