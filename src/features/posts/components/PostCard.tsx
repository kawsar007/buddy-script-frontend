'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { MoreHorizontal, Pencil, Trash2, MessageCircle } from 'lucide-react';
import type { Post } from '../types/post.types';
import { useUpdatePost } from '../hooks/useUpdatePost';
import { useDeletePost } from '../hooks/useDeletePost';
import { PostFormModal } from './PostFormModal';
import { VisibilityBadge } from './VisibilityBadge';
import { CommentSection } from '@/features/comments/components/CommentSection';
import { LikeButton } from '@/features/likes/components/LikeButton';
import { LikersModal } from '@/features/likes/components/LikersModal';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useAuth } from '@/contexts/AuthContext';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { formatRelativeTime } from '@/lib/utils/format-relative-time';
import { buildAssetUrl } from '@/lib/utils/build-asset-url';
import type { PostFormValues } from '../schemas/post.schema';

export function PostCard({ post }: { post: Post }) {
  const { user: currentUser } = useAuth();
  const isOwner = currentUser?.id === post.author.id;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [likersOpen, setLikersOpen] = useState(false);

  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();

  const handleEdit = async (values: PostFormValues) => {
    try {
      await updatePost.mutateAsync({ id: post.id, input: values });
      toast.success('Post updated');
      setIsEditOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = () => {
    deletePost.mutate(post.id, {
      onSuccess: () => toast.success('Post deleted'),
      onError: (error) => toast.error(getErrorMessage(error)),
    });
    setConfirmDelete(false);
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex items-start justify-between p-4 pb-3">
        <Link href={`/users/${post.author.id}`} className="flex items-center gap-3">
          <Avatar
            firstName={post.author.firstName}
            lastName={post.author.lastName}
            avatarUrl={post.author.avatarUrl}
          />
          <div>
            <p className="text-foreground text-sm font-semibold hover:underline">
              {post.author.firstName} {post.author.lastName}
            </p>
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <span>{formatRelativeTime(post.createdAt)}</span>
              <span aria-hidden="true">·</span>
              <VisibilityBadge visibility={post.visibility} />
            </div>
          </div>
        </Link>

        {isOwner && (
          <DropdownMenu
            trigger={<MoreHorizontal className="h-5 w-5" aria-hidden="true" />}
            items={[
              {
                label: 'Edit post',
                icon: <Pencil className="h-3.5 w-3.5" />,
                onSelect: () => setIsEditOpen(true),
              },
              {
                label: 'Delete post',
                icon: <Trash2 className="h-3.5 w-3.5" />,
                destructive: true,
                onSelect: () => setConfirmDelete(true),
              },
            ]}
          />
        )}
      </div>

      {post.content && (
        <p className="text-foreground px-4 pb-3 text-sm whitespace-pre-wrap">
          {post.content}
        </p>
      )}

      {post.imageUrl && (
        <div className="bg-muted relative aspect-[4/3] w-full sm:aspect-video">
          <Image
            src={buildAssetUrl(post.imageUrl)}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover"
          />
        </div>
      )}

      <div className="border-border flex items-center justify-between border-t px-4 py-2">
        <LikeButton
          targetType="post"
          targetId={post.id}
          onCountClick={() => setLikersOpen(true)}
        />
        <button
          type="button"
          onClick={() => setCommentsOpen((prev) => !prev)}
          className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium transition-colors"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Comment
        </button>
      </div>

      {commentsOpen && <CommentSection postId={post.id} />}

      <PostFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        post={post}
        isSubmitting={updatePost.isPending}
        onSubmit={handleEdit}
      />

      <ConfirmDialog
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
        title="Delete post?"
        message="This will permanently delete this post, along with its comments and likes."
        confirmLabel="Delete"
        isLoading={deletePost.isPending}
      />

      <LikersModal
        isOpen={likersOpen}
        onClose={() => setLikersOpen(false)}
        targetType="post"
        targetId={post.id}
      />
    </Card>
  );
}
