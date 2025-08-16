import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/app/api/api';
import { useUpdateProfile } from './use-auth';
import type { UpdateUserData } from '@/lib/types';

interface UseUserMutationsProps {
  isCurrentUser: boolean;
  onSuccess?: () => void;
}

export function useUserMutations({ isCurrentUser, onSuccess }: UseUserMutationsProps) {
  const queryClient = useQueryClient();
  const updateProfile = useUpdateProfile();

  const updateAnyUser = useMutation({
    mutationFn: async (data: { id: number; updateData: UpdateUserData }) => {
      return api.updateUser(data.id, data.updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleUpdate = async (userId: number, updateData: UpdateUserData) => {
    try {
      if (isCurrentUser) {
        await updateProfile.mutateAsync({ id: userId, updateData });
        toast.success('Профиль успешно обновлен');
      } else {
        await updateAnyUser.mutateAsync({ id: userId, updateData });
        toast.success('Пользователь успешно обновлен');
      }
      onSuccess?.();
    } catch (error) {
      const errorMessage = isCurrentUser
        ? 'Ошибка при обновлении профиля'
        : 'Ошибка при обновлении пользователя';
      toast.error(errorMessage);
      console.error('Update error:', error);
      throw error;
    }
  };

  const isPending = updateProfile.isPending || updateAnyUser.isPending;

  return {
    handleUpdate,
    isPending,
  };
}
