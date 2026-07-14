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
import { useRegister } from '../hooks/useRegister';
import { registerSchema, type RegisterFormValues } from '../schemas/auth.schemas';
import { GoogleSignInButton } from './GoogleSignInButton';


export function RegisterForm() {
  const router = useRouter();
  const registerUser = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '' },
  });

  const onSubmit = (values: RegisterFormValues) => {
    registerUser.mutate(values, {
      onSuccess: () => {
        toast.success('Account created!');
        router.push(ROUTES.profile);
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
          label="First name"
          autoComplete="given-name"
          required
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          label="Last name"
          autoComplete="family-name"
          required
          error={errors.lastName?.message}
          {...register('lastName')}
        />
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
          autoComplete="new-password"
          required
          // hint="At least 8 characters, with upper/lowercase, a number, and a symbol."
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" isLoading={registerUser.isPending} className="mt-2 w-full">
          Create account
        </Button>
        <p className="text-muted-foreground text-center text-sm">
          Already have an account?{' '}
          <Link href={ROUTES.login} className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
