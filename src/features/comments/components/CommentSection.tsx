'use client';

import { Button } from '@/src/components/ui/Button';
import { ErrorState } from '@/src/components/ui/ErrorState';
import { Spinner } from '@/src/components/ui/Spinner';
import { useAuth } from '@/src/contexts/AuthContext';
import { getErrorMessage } from '@/src/lib/utils/get-error-message';
import toast from 'react-hot-toast';
import { useCreateComment } from '../hooks/useCreateComment';
import { useTopLevelComments } from '../hooks/useTopLevelComments';
import { CommentComposer } from './CommentComposer';
import { CommentItem } from './CommentItem';

export function CommentSection({ postId }: { postId: number }) {
  const { user: currentUser } = useAuth();
  const commentsQuery = useTopLevelComments(postId, true);
  const createComment = useCreateComment(postId);

  const comments = commentsQuery.data?.pages.flatMap((page) => page.data) ?? [];

  const handleCreate = async (content: string) => {
    try {
      await createComment.mutateAsync(content);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="border-border flex flex-col gap-3 border-t p-4">
      {currentUser && (
        <CommentComposer
          authorFirstName={currentUser.firstName}
          authorLastName={currentUser.lastName}
          isSubmitting={createComment.isPending}
          onSubmit={handleCreate}
        />
      )}

      {commentsQuery.isLoading ? (
        <div className="flex justify-center py-4">
          <Spinner label="Loading comments…" />
        </div>
      ) : commentsQuery.isError ? (
        <ErrorState
          message={getErrorMessage(commentsQuery.error)}
          onRetry={() => commentsQuery.refetch()}
        />
      ) : comments.length === 0 ? (
        <p className="text-muted-foreground py-2 text-center text-sm">
          No comments yet. Be the first to say something.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} postId={postId} />
          ))}
        </div>
      )}

      {commentsQuery.hasNextPage && (
        <Button
          variant="ghost"
          size="sm"
          className="self-center"
          onClick={() => commentsQuery.fetchNextPage()}
          isLoading={commentsQuery.isFetchingNextPage}
        >
          Load more comments
        </Button>
      )}
    </div>
  );
}
