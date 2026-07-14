import { PublicProfileCard } from '@/src/features/users/components/PublicProfileCard';
import { PublicUser } from '@/src/features/users/types/user.types';
import { serverApiGet } from '@/src/lib/api/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

function isValidId(id: string): boolean {
  return /^\d+$/.test(id);
}

async function fetchUser(id: string): Promise<PublicUser | null> {
  if (!isValidId(id)) return null;
  return serverApiGet<PublicUser>(`/users/${id}`);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const user = await fetchUser(id);
  return { title: user ? `${user.firstName} ${user.lastName}` : 'User not found' };
}

export default async function PublicUserPage({ params }: PageProps) {
  const { id } = await params;
  const user = await fetchUser(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <PublicProfileCard user={user} />
    </div>
  );
}
