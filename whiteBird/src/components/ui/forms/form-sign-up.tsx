import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../button/button';
import { Input } from '../input';
import { Label } from '../label';
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
        <div className="space-y-2">
          <Label htmlFor="name">Имя</Label>
          <Input
            id="name"
            placeholder="Иван Иванов"
            {...register('name')}
            disabled={isSubmitting}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="ivan_ivanov"
            {...register('username')}
            disabled={isSubmitting}
            aria-invalid={!!errors.username}
          />
          {errors.username && (
            <p className="text-sm text-destructive">{errors.username.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="ivan@example.com"
          {...register('email')}
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Пароль</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          disabled={isSubmitting}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Телефон</Label>
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
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Сайт (необязательно)</Label>
        <Input
          id="website"
          placeholder="https://example.com"
          {...register('website')}
          disabled={isSubmitting}
          aria-invalid={!!errors.website}
        />
        {errors.website && (
          <p className="text-sm text-destructive">{errors.website.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">О себе (необязательно)</Label>
        <Input
          id="bio"
          placeholder="Расскажите о себе..."
          {...register('bio')}
          disabled={isSubmitting}
          aria-invalid={!!errors.bio}
        />
        {errors.bio && (
          <p className="text-sm text-destructive">{errors.bio.message}</p>
        )}
      </div>

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
