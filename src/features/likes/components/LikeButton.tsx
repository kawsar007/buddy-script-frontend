'use client';

import { cn } from '@/src/lib/utils/cn';
import { Heart } from 'lucide-react';
import { useLikeToggle } from '../hooks/useLikeToggle';
import type { LikeTargetType } from '../types/like.types';

export function LikeButton({
  targetType,
  targetId,
  size = 'md',
  onCountClick,
}: {
  targetType: LikeTargetType;
  targetId: number;
  size?: 'sm' | 'md';
  onCountClick?: () => void;
}) {
  const { liked, count, toggle, isToggling } = useLikeToggle(targetType, targetId);

  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={toggle}
        disabled={isToggling}
        aria-pressed={liked}
        className={cn(
          'flex items-center gap-1.5 rounded-md px-2 py-1 font-medium transition-colors',
          'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
          'disabled:opacity-60',
          textSize,
          liked
            ? 'text-destructive'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        <Heart className={cn(iconSize, liked && 'fill-current')} aria-hidden="true" />
        Like
      </button>
      {count > 0 &&
        (onCountClick ? (
          <button
            type="button"
            onClick={onCountClick}
            className={cn('text-muted-foreground hover:underline', textSize)}
          >
            {count} {count === 1 ? 'like' : 'likes'}
          </button>
        ) : (
          <span className={cn('text-muted-foreground', textSize)}>
            {count} {count === 1 ? 'like' : 'likes'}
          </span>
        ))}
    </div>
  );
}
