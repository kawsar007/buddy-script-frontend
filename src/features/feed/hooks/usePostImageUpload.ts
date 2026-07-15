import { useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { PostFormValues } from '../schemas/post.schema';

export function usePostImageUpload(
  setValue: UseFormSetValue<PostFormValues>,
  initialPreviewUrl: string | null = null,
) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialPreviewUrl);
  const [hasNewImage, setHasNewImage] = useState(false);

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

  const resetImage = (nextPreviewUrl: string | null = null) => {
    setPreviewUrl(nextPreviewUrl);
    setHasNewImage(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return { fileInputRef, previewUrl, hasNewImage, handleFileChange, clearImage, resetImage };
}