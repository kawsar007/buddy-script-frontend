'use client';

import { useAuth } from '@/src/contexts/AuthContext';
import { LogoutButton } from '@/src/features/auth/components/LogoutButton';
import { ROUTES } from '@/src/lib/constants/routes';
import { Rss } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '../theme/ThemeToggle';
// import { useAuth } from '@/contexts/AuthContext';
// import { ThemeToggle } from '@/components/theme/ThemeToggle';
// import { LogoutButton } from '@/features/auth/components/LogoutButton';
// import { buttonVariants } from '@/components/ui/Button';
// import { ROUTES } from '@/lib/constants/routes';

export function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <header className="border-border bg-background border-b">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href={ROUTES.home} className="flex items-center gap-2 font-semibold">
          <Rss className="text-primary h-5 w-5" aria-hidden="true" />
          Social Feed
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isLoading ? null : isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground hidden text-sm sm:inline">
                {user?.firstName}
              </span>
              <LogoutButton />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={ROUTES.login} >
                Sign in
              </Link>
              <Link href={ROUTES.register} >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
