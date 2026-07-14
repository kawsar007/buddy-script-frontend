import { ProfileCard } from '@/src/features/users/components/ProfileCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your profile',
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <ProfileCard />
    </div>
  );
}
