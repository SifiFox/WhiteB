import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/app/api/api';
import type { UpdateUserData } from '../types';
import { authKeys } from './use-auth';

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: () => api.getUsers(),
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => api.getUserById(id),
    enabled: !!id,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserData }) =>
      api.updateUser(id, data),
    onSuccess: (updatedUser, { id }) => {
      queryClient.setQueryData(userKeys.detail(id), updatedUser);
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });

      const currentUser = queryClient.getQueryData(authKeys.user);
      if (currentUser && (currentUser as { id: number }).id === id) {
        const { password: _password, ...authUser } = updatedUser;
        void _password;
        queryClient.setQueryData(authKeys.user, authUser);
        localStorage.setItem('auth-user', JSON.stringify(authUser));
      }
    },
  });
}
