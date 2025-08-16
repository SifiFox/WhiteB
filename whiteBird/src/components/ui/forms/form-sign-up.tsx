import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../button/button';
import { Input } from '../input';
import { FormField } from '@/components/ui/forms/form-field';
import { signUpSchema, type SignUpFormData } from '@/lib/schemas/schema-sign-up';
import { useRegister } from '@/lib/hooks';
import { Loader2 } from 'lucide-react';
import { PhoneInput } from '../phone-input';

interface FormSignUpProps {
  onSuccess?: () => void;
}

export function FormSignUp({ onSuccess }: FormSignUpProps) {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      phone: '',
      website: '',
      bio: '',
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await registerMutation.mutateAsync(data);
      onSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка регистрации';
      setError('root', {
        type: 'manual',
        message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="name"
          label="Имя"
          error={errors.name?.message}
        >
          <Input
            id="name"
            placeholder="Иван Иванов"
            {...register('name')}
            disabled={isSubmitting}
            aria-invalid={!!errors.name}
          />
        </FormField>

        <FormField
          id="username"
          label="Username"
          error={errors.username?.message}
        >
          <Input
            id="username"
            placeholder="ivan_ivanov"
            {...register('username')}
            disabled={isSubmitting}
            aria-invalid={!!errors.username}
          />
        </FormField>
      </div>

      <FormField
        id="email"
        label="Email"
        error={errors.email?.message}
      >
        <Input
          id="email"
          type="email"
          placeholder="ivan@example.com"
          {...register('email')}
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
        />
      </FormField>

      <FormField
        id="password"
        label="Пароль"
        error={errors.password?.message}
      >
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          disabled={isSubmitting}
          aria-invalid={!!errors.password}
        />
      </FormField>

      <FormField
        id="phone"
        label="Телефон"
        error={errors.phone?.message}
      >
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              {...field}
              placeholder="Введите номер телефона"
              disabled={isSubmitting}
              aria-invalid={!!errors.phone}
            />
          )}
        />
      </FormField>

      <FormField
        id="website"
        label="Сайт (необязательно)"
        error={errors.website?.message}
      >
        <Input
          id="website"
          placeholder="https://example.com"
          {...register('website')}
          disabled={isSubmitting}
          aria-invalid={!!errors.website}
        />
      </FormField>

      <FormField
        id="bio"
        label="О себе (необязательно)"
        error={errors.bio?.message}
      >
        <Input
          id="bio"
          placeholder="Расскажите о себе..."
          {...register('bio')}
          disabled={isSubmitting}
          aria-invalid={!!errors.bio}
        />
      </FormField>

      {errors.root && (
        <p className="text-sm text-destructive">{errors.root.message}</p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Зарегистрироваться
      </Button>
    </form>
  );
}
