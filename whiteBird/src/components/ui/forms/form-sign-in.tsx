import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/ui/forms/form-field';
import { signInSchema, type SignInFormData } from '@/lib/schemas/schema-sign-in';
import { useLogin } from '@/lib/hooks';
import { Loader2 } from 'lucide-react';

interface FormSignInProps {
  onSuccess?: () => void;
}

export function FormSignIn({ onSuccess }: FormSignInProps) {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      onSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка входа';
      setError('root', {
        type: 'manual',
        message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        id="login"
        label="Email или логин"
        error={errors.login?.message}
      >
        <Input
          id="login"
          placeholder="example@email.com или username"
          {...register('login')}
          disabled={isSubmitting}
          aria-invalid={!!errors.login}
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

      {errors.root && (
        <p className="text-sm text-destructive">{errors.root.message}</p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Войти
      </Button>

      <div className="flex flex-col gap-2 text-sm text-muted-foreground ">
        <p>Тестовые учетки: </p>
        <div className="flex gap-2">
          <span>admin:</span>
          <span className="font-medium">Bret</span>
          <span className="font-medium">admin123</span>
        </div>
        <div className="flex gap-2">
          <span>user:</span>
          <span className="font-medium">Antonette</span>
          <span className="font-medium">password123</span>
        </div>
      </div>
    </form>
  );
}
