import type { AuthUser } from '../types';
import { api } from '@/app/api/api';

let userCache: AuthUser | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000;

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (typeof window === 'undefined') return null;

  const now = Date.now();
  if (userCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return userCache;
  }

  try {
    const user = await api.getCurrentUser();
    userCache = user;
    cacheTimestamp = now;
    return user;
  } catch {
    userCache = null;
    cacheTimestamp = now;
    return null;
  }
}

export function getCurrentUserSync(): AuthUser | null {
  return userCache;
}

export function isAuthenticated(): boolean {
  const user = getCurrentUserSync();
  return !!user;
}

export function isAdmin(): boolean {
  const user = getCurrentUserSync();
  return user?.isAdmin === true;
}

export function clearAuth(): void {
  localStorage.removeItem('auth-token');
  userCache = null;
  cacheTimestamp = 0;
}

export function saveAuth(token: string): void {
  localStorage.setItem('auth-token', token);
  userCache = null;
  cacheTimestamp = 0;
}
