'use client';

import { buttonVariants } from '@/src/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { ErrorState } from "@/src/components/ui/ErrorState";
import { Spinner } from "@/src/components/ui/Spinner";
import { useAuth } from "@/src/contexts/AuthContext";
import { getErrorMessage } from "@/src/lib/utils/get-error-message";
import { ExternalLink, Pencil } from "lucide-react";
import Link from "next/link";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";

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
      <CardFooter className="gap-2">
        <Link href="/profile/edit" className={buttonVariants('primary', 'sm')}>
          <Pencil className="h-4 w-4" aria-hidden="true" />
          Edit profile
        </Link>
        <Link href={`/users/${user.id}`} className={buttonVariants('outline', 'sm')}>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          View public profile
        </Link>
      </CardFooter>
    </Card>
  );
}
