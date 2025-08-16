import { redirect } from '@tanstack/react-router';
import { toast } from 'sonner';
import { getCurrentUser, getCurrentUserSync, isAuthenticated, isAdmin } from './auth-utils';
import type { AuthUser } from '../types';

export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();

  if (!user) {
    toast.error('Необходимо войти в систему для доступа к этой странице');
    throw redirect({ to: '/' });
  }

  return user;
}

export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireAuth();

  if (!user.isAdmin) {
    toast.error('Доступ запрещен. Требуются права администратора');
    throw redirect({ to: '/' });
  }

  return user;
}

export async function getOptionalAuth(): Promise<AuthUser | null> {
  return getCurrentUser();
}

export function requireAuthSync(): AuthUser {
  if (!isAuthenticated()) {
    toast.error('Необходимо войти в систему для доступа к этой странице');
    throw redirect({ to: '/' });
  }

  return getCurrentUserSync()!;
}

export function requireAdminSync(): AuthUser {
  const user = requireAuthSync();

  if (!isAdmin()) {
    toast.error('Доступ запрещен. Требуются права администратора');
    throw redirect({ to: '/' });
  }

  return user;
}

export function getOptionalAuthSync(): AuthUser | null {
  return getCurrentUserSync();
}
