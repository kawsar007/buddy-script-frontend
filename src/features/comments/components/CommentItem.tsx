'use client';

import { Avatar } from '@/src/components/ui/Avatar';
import { Button } from '@/src/components/ui/Button';
import { ConfirmDialog } from '@/src/components/ui/ConfirmDialog';
import { DropdownMenu } from '@/src/components/ui/DropdownMenu';
import { Spinner } from '@/src/components/ui/Spinner';
import { useAuth } from '@/src/contexts/AuthContext';
import { formatRelativeTime } from '@/src/lib/utils/format-relative-time';
import { getErrorMessage } from '@/src/lib/utils/get-error-message';
import { ChevronDown, MessageCircle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LikeButton } from '../../likes/components/LikeButton';
import { useCreateReply } from '../hooks/useCreateReply';
import { useDeleteComment } from '../hooks/useDeleteComment';
import { useReplies } from '../hooks/useReplies';
import { useUpdateComment } from '../hooks/useUpdateComment';
import type { Comment } from '../types/comment.types';
import { CommentComposer } from './CommentComposer';

const MAX_VISUAL_DEPTH = 4;

export function CommentItem({
  comment,
  postId,
  depth = 0,
}: {
  comment: Comment;
  postId: number;
  depth?: number;
}) {
  const { user: currentUser } = useAuth();
  const isOwner = currentUser?.id === comment.author.id;
  const indentDepth = Math.min(depth, MAX_VISUAL_DEPTH);

  const [isReplying, setIsReplying] = useState(false);
  const [repliesExpanded, setRepliesExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const repliesQuery = useReplies(comment.id, repliesExpanded);
  const createReply = useCreateReply(postId, comment.id);
  const updateComment = useUpdateComment(postId, comment.parentId);
  const deleteComment = useDeleteComment(postId, comment.parentId);

  const replies = repliesQuery.data?.pages.flatMap((page) => page.data) ?? [];

  const handleReply = async (content: string) => {
    try {
      await createReply.mutateAsync(content);
      setIsReplying(false);
      setRepliesExpanded(true);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleSaveEdit = () => {
    if (!editValue.trim()) return;
    updateComment.mutate(
      { id: comment.id, content: editValue.trim() },
      {
        onSuccess: () => setIsEditing(false),
        onError: (error) => toast.error(getErrorMessage(error)),
      },
    );
  };

  const handleDelete = () => {
    deleteComment.mutate(comment.id, {
      onSuccess: () => setConfirmDelete(false),
      onError: (error) => {
        toast.error(getErrorMessage(error));
        setConfirmDelete(false);
      },
    });
  };

  return (
    <div style={{ marginLeft: indentDepth > 0 ? 20 : 0 }}>
      <div className="flex gap-2">
        <Avatar
          firstName={comment.author?.firstName}
          lastName={comment.author?.lastName}
          avatarUrl={comment.author?.avatarUrl}
          size="sm"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="bg-bg rounded-2xl px-3 py-2">
              <p className="text-foreground text-sm font-semibold">
                {comment.author.firstName} {comment.author.lastName}
              </p>
              {isEditing ? (
                <div className="mt-1 flex flex-col gap-2">
                  <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    rows={2}
                    className="border-input bg-background text-foreground focus-visible:ring-ring w-full resize-none rounded-lg border p-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      isLoading={updateComment.isPending}
                      onClick={handleSaveEdit}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setIsEditing(false);
                        setEditValue(comment.content);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-foreground text-sm">{comment.content}</p>
              )}
            </div>

            {isOwner && !isEditing && (
              <DropdownMenu
                trigger={<MoreHorizontal className="h-4 w-4" aria-hidden="true" />}
                items={[
                  {
                    label: 'Edit',
                    icon: <Pencil className="h-3.5 w-3.5" />,
                    onSelect: () => setIsEditing(true),
                  },
                  {
                    label: 'Delete',
                    icon: <Trash2 className="h-3.5 w-3.5" />,
                    destructive: true,
                    onSelect: () => setConfirmDelete(true),
                  },
                ]}
              />
            )}
          </div>

          <div className="mt-1 flex items-center gap-3 pl-3">
            <span className="text-muted-foreground text-xs">
              {formatRelativeTime(comment.createdAt)}
            </span>
            <LikeButton targetType="comment" targetId={comment.id} size="sm" />
            <button
              type="button"
              onClick={() => setIsReplying((prev) => !prev)}
              className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs font-medium"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Reply
            </button>
            {comment.repliesCount > 0 && (
              <button
                type="button"
                onClick={() => setRepliesExpanded((prev) => !prev)}
                className="text-primary flex items-center gap-1 text-xs font-medium hover:underline"
              >
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${repliesExpanded ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
                {repliesExpanded ? 'Hide' : 'View'} {comment.repliesCount}{' '}
                {comment.repliesCount === 1 ? 'reply' : 'replies'}
              </button>
            )}
          </div>

          {isReplying && currentUser && (
            <div className="mt-2 pl-3">
              <CommentComposer
                authorFirstName={currentUser.firstName}
                authorLastName={currentUser.lastName}
                placeholder={`Reply to ${comment.author.firstName}…`}
                isSubmitting={createReply.isPending}
                onSubmit={handleReply}
                autoFocus
              />
            </div>
          )}

          {repliesExpanded && (
            <div className="mt-3 flex flex-col gap-3">
              {repliesQuery.isLoading ? (
                <Spinner size="sm" label="Loading replies…" />
              ) : (
                replies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    postId={postId}
                    depth={depth + 1}
                  />
                ))
              )}
              {repliesQuery.hasNextPage && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="self-start"
                  onClick={() => repliesQuery.fetchNextPage()}
                  isLoading={repliesQuery.isFetchingNextPage}
                >
                  Load more replies
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
        title="Delete comment?"
        message="This will permanently delete this comment and any replies to it."
        confirmLabel="Delete"
        isLoading={deleteComment.isPending}
      />
    </div>
  );
}
