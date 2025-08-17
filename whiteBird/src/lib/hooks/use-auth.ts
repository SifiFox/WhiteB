import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/app/api/api';
import type { LoginData, RegisterData, UpdateUserData } from '../types';

export const authKeys = {
  user: ['auth', 'user'] as const,
};

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginData) => api.login(data),
    onSuccess: (response) => {
      localStorage.setItem('auth-token', response.token);
      queryClient.invalidateQueries({ queryKey: authKeys.user });
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterData) => api.register(data),
    onSuccess: (response) => {
      localStorage.setItem('auth-token', response.token);
      queryClient.invalidateQueries({ queryKey: authKeys.user });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.user });
      localStorage.removeItem('auth-token');
      window.location.reload();
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.user,
    queryFn: async () => {
      const { api } = await import('@/app/api/api');
      return api.getCurrentUser();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useIsAuthenticated() {
  const { data: user } = useCurrentUser();
  return !!user;
}

export function useIsAdmin() {
  const { data: user } = useCurrentUser();
  return user?.isAdmin ?? false;
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; updateData: UpdateUserData }) => {
      return api.updateUser(data.id, data.updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.user });
    },
  });
}
