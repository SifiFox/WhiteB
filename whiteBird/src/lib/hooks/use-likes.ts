import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/app/api/api';
import { postKeys } from './use-posts';

export const likeKeys = {
  all: ['likes'] as const,
  byPost: (postId: number) => [...likeKeys.all, 'post', postId] as const,
};
export function useLikes(postId: number) {
  return useQuery({
    queryKey: likeKeys.byPost(postId),
    queryFn: () => api.getLikes(postId),
    enabled: !!postId,
  });
}

export function useToggleLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      postId,
      type,
    }: {
      userId: number;
      postId: number;
      type: 'like' | 'dislike'
    }) => {
      const likes = await api.getLikes(postId);
      const existingLike = likes.find(l => l.userId === userId && l.postId === postId);

      if (existingLike) {
        if (existingLike.type === type) {
          await api.deleteLike(existingLike.id);
        } else {
          await api.updateLike(existingLike.id, type);
        }
      } else {
        await api.createLike(userId, postId, type);
      }

      const updatedLikes = await api.getLikes(postId);
      const likesCount = updatedLikes.filter(l => l.type === 'like').length;
      const dislikesCount = updatedLikes.filter(l => l.type === 'dislike').length;

      await api.updatePost(postId, {
        likes: likesCount,
        dislikes: dislikesCount,
      });
    },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: likeKeys.byPost(postId) });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}
