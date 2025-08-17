import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/app/api/api';
import type { CreateCommentData } from '../types';

export const commentKeys = {
  all: ['comments'] as const,
  byPost: (postId: string) => [...commentKeys.all, 'post', postId] as const,
};

export function useComments(postId: string) {
  return useQuery({
    queryKey: commentKeys.byPost(postId),
    queryFn: () => api.getCommentsByPostId(postId),
    enabled: !!postId,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentData) => api.createComment(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.byPost(variables.postId),
      });
    },
  });
}
