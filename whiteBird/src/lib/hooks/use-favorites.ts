import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/app/api/api';

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
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: favoriteKeys.byUser(userId) });
    },
  });
}

export function useIsFavorite(userId: string, postId: string) {
  const { data: favorites = [] } = useFavorites(userId);
  return favorites.some(f => f.postId === postId);
}
