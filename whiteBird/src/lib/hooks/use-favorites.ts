import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/app/api/api';
import type { Favorite } from '@/lib/types';
import { toast } from 'sonner';

export const favoriteKeys = {
  all: ['favorites'] as const,
  byUser: (userId: string) => [...favoriteKeys.all, 'user', userId] as const,
};

export function useFavorites(userId: string) {
  return useQuery({
    queryKey: favoriteKeys.byUser(userId),
    queryFn: () => api.getFavorites(userId),
    enabled: !!userId,
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, postId }: { userId: string; postId: string }) => {
      const favorites = await api.getFavorites(userId);
      const existingFavorite = favorites.find(f => f.postId === postId);

      if (existingFavorite) {
        await api.removeFromFavorites(existingFavorite.id);
        return { action: 'removed' as const };
      } else {
        await api.addToFavorites(userId, postId);
        return { action: 'added' as const };
      }
    },

    onMutate: async ({ userId, postId }) => {
      await queryClient.cancelQueries({ queryKey: favoriteKeys.byUser(userId) });

      const previousFavorites = queryClient.getQueryData<Favorite[]>(favoriteKeys.byUser(userId)) || [];

      const existingFavorite = previousFavorites.find(f => f.postId === postId);
      let newFavorites: Favorite[];

      if (existingFavorite) {
        newFavorites = previousFavorites.filter(f => f.postId !== postId);
      } else {
        const newFavorite: Favorite = {
          id: `temp-${Date.now()}`,
          userId,
          postId,
        };
        newFavorites = [...previousFavorites, newFavorite];
      }

      queryClient.setQueryData(favoriteKeys.byUser(userId), newFavorites);

      return { previousFavorites };
    },

    onError: (_, { userId }, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(favoriteKeys.byUser(userId), context.previousFavorites);
      }

      toast.error('Не удалось обновить избранное. Попробуйте еще раз.');
    },

    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: favoriteKeys.byUser(userId) });
    },
  });
}

export function useIsFavorite(userId: string, postId: string) {
  const { data: favorites = [] } = useFavorites(userId);
  return favorites.some(f => f.postId === postId);
}
