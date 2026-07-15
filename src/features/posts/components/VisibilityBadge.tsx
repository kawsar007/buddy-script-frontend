import { Globe2, Lock } from 'lucide-react';
import type { PostVisibility } from '../types/post.types';

export function VisibilityBadge({ visibility }: { visibility: PostVisibility }) {
  const isPublic = visibility === 'PUBLIC';
  const Icon = isPublic ? Globe2 : Lock;

  return (
    <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
      <Icon className="h-3 w-3" aria-hidden="true" />
      {isPublic ? 'Public' : 'Private'}
    </span>
  );
}
