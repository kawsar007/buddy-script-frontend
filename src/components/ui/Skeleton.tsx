import { cn } from '@/src/lib/utils/cn';
import type { HTMLAttributes } from 'react';

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="presentation"
      className={cn('bg-muted animate-pulse rounded-md', className)}
      {...props}
    />
  );
}
