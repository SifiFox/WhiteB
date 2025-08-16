import { createFileRoute } from '@tanstack/react-router';
import { requireAuth } from '@/lib/auth/auth-guards';

export const Route = createFileRoute('/profile')({
  beforeLoad: async () => {
    await requireAuth();
  },
});
