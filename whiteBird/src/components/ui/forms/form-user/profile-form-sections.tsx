import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { FormField } from '../form-field';
import type { EditProfileFormData } from '@/lib/schemas/schema-edit-profile';

interface FormSectionProps {
  register: UseFormRegister<EditProfileFormData>;
  control: Control<EditProfileFormData>;
  errors: FieldErrors<EditProfileFormData>;
}

export function BasicInfoSection({ register, errors }: Omit<FormSectionProps, 'control'>) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormField id="name" label="Имя" error={errors.name?.message}>
        <Input
          id="name"
          {...register('name')}
          placeholder="Введите ваше имя"
        />
      </FormField>

      <FormField id="username" label="Имя пользователя" error={errors.username?.message}>
        <Input
          id="username"
          {...register('username')}
          placeholder="Введите имя пользователя"
        />
      </FormField>
    </div>
  );
}

export function ContactInfoSection({ register, control, errors }: FormSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormField id="email" label="Email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="Введите ваш email"
        />
      </FormField>

      <FormField id="phone" label="Телефон" error={errors.phone?.message}>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              value={field.value}
              onChange={field.onChange}
              placeholder="Введите ваш телефон"
            />
          )}
        />
      </FormField>
    </div>
  );
}

export function AdditionalInfoSection({ register, errors }: Omit<FormSectionProps, 'control'>) {
  return (
    <>
      <FormField id="website" label="Веб-сайт" error={errors.website?.message}>
        <Input
          id="website"
          {...register('website')}
          placeholder="https://example.com"
        />
      </FormField>

      <FormField id="bio" label="О себе" error={errors.bio?.message}>
        <textarea
          id="bio"
          {...register('bio')}
          placeholder="Расскажите о себе..."
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          rows={3}
        />
      </FormField>
    </>
  );
}
