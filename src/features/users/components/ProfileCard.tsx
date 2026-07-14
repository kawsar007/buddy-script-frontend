'use client';

import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorState } from '@/components/ui/ErrorState';
import { getErrorMessage } from '@/lib/utils/get-error-message';

const FIELD_ROWS: {
  label: string;
  render: (user: NonNullable<ReturnType<typeof useCurrentUser>['data']>) => string;
}[] = [
  { label: 'Email', render: (u) => u.email },
  { label: 'Role', render: (u) => u.role },
  { label: 'Member since', render: (u) => new Date(u.createdAt).toLocaleDateString() },
];

export function ProfileCard() {
  const { isAuthenticated } = useAuth();
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useCurrentUser(isAuthenticated);

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner size="lg" label="Loading your profile…" />
      </div>
    );
  }

  if (isError) {
    return <ErrorState message={getErrorMessage(error)} onRetry={() => refetch()} />;
  }

  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {user.firstName} {user.lastName}
        </CardTitle>
        <CardDescription>{user.bio ?? 'No bio yet.'}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm">
        {FIELD_ROWS.map(({ label, render }) => (
          <div
            key={label}
            className="border-border flex justify-between border-b pb-3 last:border-0 last:pb-0"
          >
            <span className="text-muted-foreground">{label}</span>
            <span className="text-foreground font-medium">{render(user)}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
