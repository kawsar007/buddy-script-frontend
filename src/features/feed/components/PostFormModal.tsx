'use client';

import { Button } from '@/src/components/ui/Button';
import { Modal } from '@/src/components/ui/Modal';
import { Select } from '@/src/components/ui/Select';
import { Textarea } from '@/src/components/ui/Textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image as ImageIcon, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { postFormSchema, PostFormValues } from '../schemas/post.schema';
import { Post } from '../types/post.types';

const VISIBILITY_OPTIONS = [
  { value: 'PUBLIC', label: 'Public — anyone can see this' },
  { value: 'PRIVATE', label: 'Private — only you can see this' },
];

export function PostFormModal({
  isOpen,
  onClose,
  post,
  isSubmitting,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  post?: Post;
  isSubmitting: boolean;
  onSubmit: (values: PostFormValues) => Promise<void> | void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(post?.imageUrl ?? null);
  const [hasNewImage, setHasNewImage] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      content: post?.content ?? '',
      visibility: post?.visibility ?? 'PUBLIC',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue('image', file, { shouldValidate: true });
    setHasNewImage(true);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setValue('image', undefined);
    setHasNewImage(false);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const submit = handleSubmit(async (values) => {
    await onSubmit(values);
    reset();
    setPreviewUrl(null);
    setHasNewImage(false);
  });

  const handleClose = () => {
    reset();
    setPreviewUrl(post?.imageUrl ?? null);
    setHasNewImage(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={post ? 'Edit post' : 'Create post'}
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Textarea
          label="What's on your mind?"
          rows={4}
          required
          error={errors.content?.message}
          {...register('content')}
        />

        <Select
          label="Visibility"
          options={VISIBILITY_OPTIONS}
          error={errors.visibility?.message}
          {...register('visibility')}
        />

        <div>
          <span className="text-foreground text-sm font-medium">Image (optional)</span>
          {previewUrl ? (
            <div className="border-border relative mt-1.5 overflow-hidden rounded-lg border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Selected preview"
                className="max-h-64 w-full object-cover"
              />
              <button
                type="button"
                onClick={clearImage}
                aria-label="Remove image"
                className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="border-border text-muted-foreground hover:border-primary hover:text-primary mt-1.5 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed py-6 text-sm"
            >
              <ImageIcon className="h-5 w-5" aria-hidden="true" />
              Add a photo (JPEG, PNG, or WEBP — max 5MB)
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="sr-only"
            aria-label="Upload image"
          />
          {errors.image && (
            <p role="alert" className="text-destructive mt-1 text-sm">
              {errors.image.message}
            </p>
          )}
        </div>
        {!hasNewImage && post?.imageUrl && (
          <p className="text-muted-foreground text-xs">
            Leaving this empty keeps the current image.
          </p>
        )}

        <div className="mt-1 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {post ? 'Save changes' : 'Post'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
