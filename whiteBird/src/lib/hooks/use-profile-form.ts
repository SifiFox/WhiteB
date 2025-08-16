import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editProfileSchema, type EditProfileFormData } from '@/lib/schemas/schema-edit-profile';
import { useUserMutations } from './use-user-mutations';
import type { AuthUser, User, UpdateUserData } from '@/lib/types';

interface UseProfileFormProps {
  user: AuthUser | User;
  isCurrentUser?: boolean;
  onSuccess?: () => void;
}

export function useProfileForm({ user, isCurrentUser = true, onSuccess }: UseProfileFormProps) {
  const { handleUpdate, isPending } = useUserMutations({ isCurrentUser, onSuccess });

  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website || '',
      bio: user.bio || '',
    },
  });

  const onSubmit = async (data: EditProfileFormData) => {
    const updateData: UpdateUserData = {
      ...data,
      website: data.website || undefined,
      bio: data.bio || undefined,
    };

    await handleUpdate(user.id, updateData);
  };

  return {
    form,
    onSubmit,
    isPending,
  };
}
