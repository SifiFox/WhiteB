import { createFileRoute } from '@tanstack/react-router';
import { requireAdmin } from '@/lib/auth/auth-guards';

export const Route = createFileRoute('/users')({
  beforeLoad: async (): Promise<void> => {
    await requireAdmin();
  },
});
