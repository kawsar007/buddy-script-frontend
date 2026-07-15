'use client';

import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { ROUTES } from '@/src/lib/constants/routes';
import { getErrorMessage } from '@/src/lib/utils/get-error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLogin } from '../hooks/useLogin';
import { loginSchema, type LoginFormValues } from '../schemas/auth.schemas';
import { GoogleSignInButton } from './GoogleSignInButton';

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (values: LoginFormValues) => {
    login.mutate(values, {
      onSuccess: () => {
        toast.success('Welcome back!');
        router.push(ROUTES.feed);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-muted text-md font-normal">Welcome back</p>
        <h1 className="font-display text-ink mt-1 text-2xl font-medium sm:text-3xl">
          Login to your account
        </h1>
      </div>

      <GoogleSignInButton />

      <div className="flex items-center gap-3">
        <span className="bg-border h-px flex-1" />
        <span className="text-muted text-xs font-medium">Or</span>
        <span className="bg-border h-px flex-1" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          required
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" isLoading={login.isPending} className="mt-2 w-full cursor-pointer text-white">
          Login now
        </Button>
        <p className="text-muted-foreground text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href={ROUTES.register} className="text-primary font-medium hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
