"use client";

import { Avatar } from "@/src/components/ui/Avatar";
import { ConfirmDialog } from "@/src/components/ui/ConfirmDialog";
import { DropdownMenu } from "@/src/components/ui/DropdownMenu";
import { useAuth } from "@/src/contexts/AuthContext";
import { buildAssetUrl } from "@/src/lib/utils/build-asset-url";
import { formatRelativeTime } from "@/src/lib/utils/format-relative-time";
import { getErrorMessage } from "@/src/lib/utils/get-error-message";
import { PostContent } from "@/src/types/feed.types";
import {
  Globe2,
  MessageCircle,
  MoreVertical,
  Pencil,
  Trash2,
  Users
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { CommentSection } from "../../comments/components/CommentSection";
import { LikeButton } from "../../likes/components/LikeButton";
import { LikersModal } from "../../likes/components/LikersModal";
import { useDeletePost } from "../hooks/useDeletePost";
import { useUpdatePost } from "../hooks/useUpdatePost";
import { PostFormValues } from "../schemas/post.schema";
import { PostFormModal } from "./PostFormModal";

export function PostCard({ post }: { post: PostContent }) {
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
    <article className="border-border bg-surface rounded-2xl border p-5 shadow-sm">
      <div className="flex items-start gap-3">
        {/* <Avatar name={post.author.name} size="sm" /> */}
        <Avatar avatarUrl={post.author.avatarUrl} firstName={post.author.firstName} lastName={post.author.lastName} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="text-ink truncate text-sm font-semibold">{post.author.firstName} {post.author.lastName}</p>
          <div className="text-muted flex items-center gap-1 text-xs">
            <span>{formatRelativeTime(post.createdAt)}</span>
            <span aria-hidden="true">·</span>
            {post.visibility === "PUBLIC" ? (
              <Globe2 className="size-3" aria-label="Public" />
            ) : (
              <Users className="size-3" aria-label={post.visibility} />
            )}
            <span>{post.visibility}</span>
          </div>
        </div>
        {isOwner && (
          <DropdownMenu
            trigger={<MoreVertical className="h-5 w-5" aria-hidden="true" />}
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

      <p className="text-ink mt-3 text-sm leading-relaxed">{post.content}</p>


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

      <div className="border-border text-muted mt-4 flex items-center gap-1 border-t pt-3 text-sm">
        <LikeButton
          targetType="post"
          targetId={post.id}
          onCountClick={() => setLikersOpen(true)}
        />
        <button
          type="button"
          onClick={() => setCommentsOpen((prev) => !prev)}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium transition-colors"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Comment
        </button>
        {/* <button
          type="button"
          className="hover:bg-bg hover:text-ink flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 font-medium transition-colors"
        >
          <Share2 className="size-4" aria-hidden="true" />
          {post.shareCount}
        </button> */}
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

    </article>
  );
}
