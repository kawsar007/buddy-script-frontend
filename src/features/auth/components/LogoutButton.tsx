'use client';

import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Button, type ButtonProps } from '@/components/ui/Button';

export function LogoutButton(props: Omit<ButtonProps, 'onClick'>) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Signed out');
  };

  return (
    <Button variant="outline" size="sm" onClick={handleLogout} {...props}>
      <LogOut className="h-4 w-4" aria-hidden="true" />
      Sign out
    </Button>
  );
}
