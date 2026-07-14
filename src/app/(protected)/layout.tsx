'use client';

import { Spinner } from '@/src/components/ui/Spinner';
import { useAuth } from '@/src/contexts/AuthContext';
import { ROUTES } from '@/src/lib/constants/routes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { Spinner } from '@/components/ui/Spinner';
// import { ROUTES } from '@/lib/constants/routes';

/**
 * proxy.ts already redirects unauthenticated requests away from this route
 * group before the page ever renders — but it only sees a UX-flag cookie,
 * not the real session. This client guard is the second layer: if that
 * cookie is stale or gets cleared mid-session, or the user reaches this
 * layout through a client-side navigation proxy.ts never saw, this catches
 * it once AuthContext finishes its own restore check.
 */
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(ROUTES.login);
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" label="Checking your session…" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect above is already in flight; render nothing rather than a
    // flash of protected content.
    return null;
  }

  // return <>{children}</>;
  return (
    <div>
      {/* <Navbar /> */}
      {children}
    </div>
  )
}
