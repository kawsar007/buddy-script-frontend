'use client';

import { Button } from '@/src/components/ui/Button';
import { ErrorState } from '@/src/components/ui/ErrorState';
import { Input } from '@/src/components/ui/Input';
import { Spinner } from '@/src/components/ui/Spinner';
import { Textarea } from '@/src/components/ui/Textarea';
import { useAuth } from '@/src/contexts/AuthContext';
import { ROUTES } from '@/src/lib/constants/routes';
import { getErrorMessage } from '@/src/lib/utils/get-error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useCurrentUser } from '../../auth/hooks/useCurrentUser';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { UpdateProfileFormValues, updateProfileSchema } from '../schemas/update-profile.schema';
import type { UpdateProfileInput } from '../types/user.types';

export function EditProfileForm() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useCurrentUser(isAuthenticated);
  const updateProfile = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    values: user
      ? {
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio ?? '',
        avatarUrl: user.avatarUrl ?? '',
      }
      : undefined,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner size="lg" label="Loading your profile…" />
      </div>
    );
  }

  if (isError) {
    return <ErrorState message={getErrorMessage(error)} onRetry={() => refetch()} />;
  }

  if (!user) return null;

  const onSubmit = (values: UpdateProfileFormValues) => {
    const payload: UpdateProfileInput = {
      firstName: values.firstName,
      lastName: values.lastName,
      bio: values.bio ?? '',
      ...(values.avatarUrl ? { avatarUrl: values.avatarUrl } : {}),
    };

    updateProfile.mutate(payload, {
      onSuccess: () => {
        toast.success('Profile updated');
        router.push(ROUTES.feed);
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First name"
          required
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          label="Last name"
          required
          error={errors.lastName?.message}
          {...register('lastName')}
        />
      </div>
      <Textarea
        label="Bio"
        rows={3}
        hint="Max 280 characters."
        error={errors.bio?.message}
        {...register('bio')}
      />
      <Input
        label="Avatar URL"
        type="url"
        placeholder="https://example.com/avatar.jpg"
        // hint="Paste a link to an image. Direct image uploads are coming in a later update."
        error={errors.avatarUrl?.message}
        {...register('avatarUrl')}
      />
      <div className="mt-2 flex gap-2">
        <Button type="submit" isLoading={updateProfile.isPending} disabled={!isDirty}>
          Save changes
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(ROUTES.profile)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
