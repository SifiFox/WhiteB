import { createFileRoute } from '@tanstack/react-router';
import type { PostsSearch } from '@/lib/types';

export const Route = createFileRoute('/posts')({
  validateSearch: (search: Record<string, unknown>): PostsSearch => {
    return {
      userId: typeof search.userId === 'string' ? search.userId : undefined,
    };
  },
});
