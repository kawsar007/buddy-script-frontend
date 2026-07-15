'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
// import { Modal } from '@/components/ui/Modal';
// import { Avatar } from '@/components/ui/Avatar';
// import { Spinner } from '@/components/ui/Spinner';
// import { Button } from '@/components/ui/Button';
// import { EmptyState } from '@/components/ui/EmptyState';
import { Heart } from 'lucide-react';
import { likesApi } from '../api/likes.api';
// import { queryKeys } from '@/lib/constants/query-keys';
import { Avatar } from '@/src/components/ui/Avatar';
import { Button } from '@/src/components/ui/Button';
import { EmptyState } from '@/src/components/ui/EmptyState';
import { Modal } from '@/src/components/ui/Modal';
import { Spinner } from '@/src/components/ui/Spinner';
import { queryKeys } from '@/src/lib/constants/query-keys';
import type { LikeTargetType } from '../types/like.types';

const LIKERS_PAGE_SIZE = 15;

export function LikersModal({
  isOpen,
  onClose,
  targetType,
  targetId,
}: {
  isOpen: boolean;
  onClose: () => void;
  targetType: LikeTargetType;
  targetId: number;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: [
        ...(targetType === 'post'
          ? queryKeys.likes.postLikers(targetId)
          : queryKeys.likes.commentLikers(targetId)),
        'list',
      ],
      queryFn: ({ pageParam }) =>
        targetType === 'post'
          ? likesApi.listPostLikers(targetId, pageParam, LIKERS_PAGE_SIZE)
          : likesApi.listCommentLikers(targetId, pageParam, LIKERS_PAGE_SIZE),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
      enabled: isOpen,
    });

  const likers = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Liked by">
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner label="Loading likes…" />
        </div>
      ) : isError ? (
        <p className="text-muted-foreground py-8 text-center text-sm">
          Couldn&apos;t load likes. Try again.
        </p>
      ) : likers.length === 0 ? (
        <EmptyState icon={Heart} title="No likes yet" />
      ) : (
        <div className="flex flex-col gap-3">
          {likers.map(({ user }) => (
            <div key={user.id} className="flex items-center gap-3">
              <Avatar
                firstName={user.firstName}
                lastName={user.lastName}
                avatarUrl={user.avatarUrl}
                size="sm"
              />
              <span className="text-foreground text-sm font-medium">
                {user.firstName} {user.lastName}
              </span>
            </div>
          ))}
          {hasNextPage && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2 self-center"
              onClick={() => fetchNextPage()}
              isLoading={isFetchingNextPage}
            >
              Load more
            </Button>
          )}
        </div>
      )}
    </Modal>
  );
}
