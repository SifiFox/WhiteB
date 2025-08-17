import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/app/api/api';
import { postKeys } from './use-posts';
import type { Like, Post } from '@/lib/types';
import { toast } from 'sonner';

export const likeKeys = {
  all: ['likes'] as const,
  byPost: (postId: string) => [...likeKeys.all, 'post', postId] as const,
};

export function useLikes(postId: string) {
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
      userId: string;
      postId: string;
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

      return { likesCount, dislikesCount };
    },

    onMutate: async ({ userId, postId, type }) => {
      await queryClient.cancelQueries({ queryKey: likeKeys.byPost(postId) });
      await queryClient.cancelQueries({ queryKey: postKeys.detail(postId) });

      const previousLikes = queryClient.getQueryData<Like[]>(likeKeys.byPost(postId)) || [];
      const previousPost = queryClient.getQueryData<Post>(postKeys.detail(postId));

      const existingLike = previousLikes.find(l => l.userId === userId && l.postId === postId);
      let newLikes: Like[] = [...previousLikes];

      if (existingLike) {
        if (existingLike.type === type) {
          newLikes = newLikes.filter(l => l.id !== existingLike.id);
        } else {
          newLikes = newLikes.map(l =>
            l.id === existingLike.id ? { ...l, type } : l,
          );
        }
      } else {
        const newLike: Like = {
          id: `temp-${Date.now()}`,
          userId,
          postId,
          type,
        };
        newLikes.push(newLike);
      }

      const likesCount = newLikes.filter(l => l.type === 'like').length;
      const dislikesCount = newLikes.filter(l => l.type === 'dislike').length;

      queryClient.setQueryData(likeKeys.byPost(postId), newLikes);

      if (previousPost) {
        queryClient.setQueryData(postKeys.detail(postId), {
          ...previousPost,
          likes: likesCount,
          dislikes: dislikesCount,
        });
      }

      const postsQueries = queryClient.getQueriesData({ queryKey: postKeys.lists() });
      postsQueries.forEach(([queryKey, data]) => {
        if (Array.isArray(data)) {
          const updatedPosts = data.map((post: Post) =>
            post.id === postId
              ? { ...post, likes: likesCount, dislikes: dislikesCount }
              : post,
          );
          queryClient.setQueryData(queryKey, updatedPosts);
        }
      });

      return { previousLikes, previousPost };
    },

    onError: (_, { postId, type }, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(likeKeys.byPost(postId), context.previousLikes);
      }
      if (context?.previousPost) {
        queryClient.setQueryData(postKeys.detail(postId), context.previousPost);
      }

      const postsQueries = queryClient.getQueriesData({ queryKey: postKeys.lists() });
      postsQueries.forEach(([queryKey, data]) => {
        if (Array.isArray(data) && context?.previousPost) {
          const restoredPosts = data.map((post: Post) =>
            post.id === postId ? context.previousPost : post,
          );
          queryClient.setQueryData(queryKey, restoredPosts);
        }
      });

      const action = type === 'like' ? 'лайк' : 'дизлайк';
      toast.error(`Не удалось обновить ${action}. Попробуйте еще раз.`);
    },

    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: likeKeys.byPost(postId) });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}
