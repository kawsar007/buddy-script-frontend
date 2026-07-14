import { ProfileCard } from '@/src/features/users/components/ProfileCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your profile',
};

/**
 * A protected page per the spec's SSR guidance — the route itself is
 * guarded server-side (proxy.ts redirects unauthenticated requests before
 * this ever renders) and client-side (the (protected) layout double-checks
 * once the real session is known). The actual profile data fetch is CSR
 * (see ProfileCard): the access token needed to call GET /users/me only
 * exists in browser memory (see contexts/AuthContext.tsx for why), so a
 * true server-side prefetch isn't possible without switching the backend
 * to cookie-based auth — documented in the README rather than faked here.
 */
export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <ProfileCard />
    </div>
  );
}
