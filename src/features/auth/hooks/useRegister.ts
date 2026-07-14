'use client';

import { useAuth } from '@/src/contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import type { RegisterFormValues } from '../schemas/auth.schemas';

export function useRegister() {
  const { setSession } = useAuth();

  return useMutation({
    mutationFn: (values: RegisterFormValues) => authApi.register(values),
    onSuccess: setSession,
  });
}
