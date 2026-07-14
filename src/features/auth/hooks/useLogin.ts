'use client';

import { useAuth } from '@/src/contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import type { LoginFormValues } from '../schemas/auth.schemas';

export function useLogin() {
  const { setSession } = useAuth();

  return useMutation({
    mutationFn: (values: LoginFormValues) => authApi.login(values),
    onSuccess: setSession,
  });
}
