import { useProfileForm } from '@/lib/hooks/use-profile-form';
import { BasicInfoSection, ContactInfoSection, AdditionalInfoSection } from './profile-form-sections';
import { FormActions } from './form-actions';
import type { AuthUser, User } from '@/lib/types';

interface FormEditProfileProps {
  user: AuthUser | User;
  onSuccess?: () => void;
  onCancel?: () => void;
  isCurrentUser?: boolean;
}

export function FormEditProfile({
  user,
  onSuccess,
  onCancel,
  isCurrentUser = true,
}: FormEditProfileProps) {
  const { form, onSubmit, isPending } = useProfileForm({
    user,
    isCurrentUser,
    onSuccess,
  });

  const { register, handleSubmit, control, formState: { errors } } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <BasicInfoSection
        register={register}
        errors={errors}
      />

      <ContactInfoSection
        register={register}
        control={control}
        errors={errors}
      />

      <AdditionalInfoSection
        register={register}
        errors={errors}
      />

      <FormActions
        isPending={isPending}
        onCancel={onCancel}
      />
    </form>
  );
}
