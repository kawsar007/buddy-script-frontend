import { FeedLayout } from '@/src/features/feed/components/FeedLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feed page',
};

export default function FeedPage() {
  return (
    <div className="">
      <FeedLayout />
    </div>
  );
}
