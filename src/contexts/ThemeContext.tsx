'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { STORAGE_KEYS } from '../lib/constants/storage';

export type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextValue {
  /** The user's stored preference — may be 'system'. */
  theme: Theme;
  /** The actual light/dark value currently applied to the page. */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * The inline anti-flicker script in RootLayout already applies the correct
 * class to <html> before hydration — this provider's job is just to bring
 * React's state in sync with what that script already decided, and to keep
 * it in sync afterwards (theme changes, system-preference changes).
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

  // Read the persisted preference once on mount. Deliberately an effect,
  // not a useState lazy initializer: a lazy initializer would read
  // localStorage during the client's hydration render too, which can
  // differ from what was server-rendered (no localStorage there) and
  // trigger a real hydration mismatch. Committing this after mount, in a
  // second render, is the standard-safe pattern for browser-only storage.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.theme);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    const applyResolved = () => {
      const resolved = theme === 'system' ? getSystemTheme() : theme;
      setResolvedTheme(resolved);
      document.documentElement.classList.toggle('dark', resolved === 'dark');
    };

    applyResolved();

    if (theme !== 'system') return;

    // Live-follow the OS preference while "system" is selected.
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', applyResolved);
    return () => mediaQuery.removeEventListener('change', applyResolved);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEYS.theme, next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
