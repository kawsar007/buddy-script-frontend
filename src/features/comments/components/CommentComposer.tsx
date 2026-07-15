'use client';

import { Avatar } from '@/src/components/ui/Avatar';
import { Button } from '@/src/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { commentTextSchema, type CommentTextValues } from '../schemas/comment.schema';

export function CommentComposer({
  authorFirstName,
  authorLastName,
  authorAvatarUrl,
  placeholder = 'Write a comment…',
  isSubmitting,
  onSubmit,
  autoFocus = false,
}: {
  authorFirstName: string;
  authorLastName: string;
  authorAvatarUrl?: string | null;
  placeholder?: string;
  isSubmitting: boolean;
  onSubmit: (content: string) => Promise<void> | void;
  autoFocus?: boolean;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentTextValues>({
    resolver: zodResolver(commentTextSchema),
    defaultValues: { content: '' },
  });

  const submit = handleSubmit(async (values) => {
    await onSubmit(values.content);
    reset();
  });

  return (
    <form onSubmit={submit} className="flex items-start gap-2">
      <Avatar
        firstName={authorFirstName}
        lastName={authorLastName}
        avatarUrl={authorAvatarUrl}
        size="sm"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <input
            {...register('content')}
            autoFocus={autoFocus}
            placeholder={placeholder}
            aria-label={placeholder}
            className="border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring h-9 flex-1 rounded-full border px-4 text-sm focus-visible:ring-2 focus-visible:outline-none"
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            isLoading={isSubmitting}
            aria-label="Send"
          >
            {!isSubmitting && <Send className="h-4 w-4" aria-hidden="true" />}
          </Button>
        </div>
        {errors.content && (
          <p role="alert" className="text-destructive mt-1 pl-1 text-xs">
            {errors.content.message}
          </p>
        )}
      </div>
    </form>
  );
}
