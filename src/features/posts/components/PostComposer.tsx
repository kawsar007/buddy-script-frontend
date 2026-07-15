'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Image as ImageIcon, PenLine, Send } from 'lucide-react';
import { PostFormModal } from './PostFormModal';
import { useCreatePost } from '../hooks/useCreatePost';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import type { PostFormValues } from '../schemas/post.schema';

export function PostComposer() {
  const { isAuthenticated } = useAuth();
  const { data: currentUser } = useCurrentUser(isAuthenticated);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createPost = useCreatePost();

  const handleSubmit = async (values: PostFormValues) => {
    try {
      await createPost.mutateAsync(values);
      toast.success('Posted!');
      setIsModalOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (!currentUser) return null;

  return (
    <Card className="p-4">
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="flex w-full items-center gap-3 text-left"
      >
        <Avatar
          firstName={currentUser.firstName}
          lastName={currentUser.lastName}
          avatarUrl={currentUser.avatarUrl}
        />
        <span className="border-border bg-background text-muted-foreground flex-1 rounded-full border px-4 py-2.5 text-sm">
          Write something…
        </span>
        <PenLine className="text-muted-foreground h-4 w-4 shrink-0" aria-hidden="true" />
      </button>

      <div className="border-border mt-3 flex items-center justify-between border-t pt-3">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
        >
          <ImageIcon className="h-4 w-4 text-emerald-500" aria-hidden="true" />
          Photo
        </button>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-primary-foreground flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors hover:opacity-90"
        >
          <Send className="h-3.5 w-3.5" aria-hidden="true" />
          Post
        </button>
      </div>

      <PostFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isSubmitting={createPost.isPending}
        onSubmit={handleSubmit}
      />
    </Card>
  );
}
