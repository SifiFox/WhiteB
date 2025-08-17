import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useCurrentUser } from '@/lib/hooks/use-auth';
import { useCreateComment } from '@/lib/hooks/use-comments';
import { commentSchema, type CommentFormData } from '@/lib/schemas/schema-comment';
import { FormField } from './form-field';
import { toast } from 'sonner';
import { useEffect } from 'react';

interface FormCommentProps {
  postId: string;
  onSuccess?: () => void;
}

export function FormComment({ postId, onSuccess }: FormCommentProps) {
  const { data: currentUser } = useCurrentUser();
  const createComment = useCreateComment();

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      body: '',
    },
  });

  useEffect(() => {
    if (currentUser) {
      form.setValue('name', currentUser.name);
      form.setValue('email', currentUser.email);

      form.clearErrors();
    } else {
      form.setValue('name', '');
      form.setValue('email', '');
      form.clearErrors();
    }
  }, [currentUser, form]);

  const onSubmit = async (data: CommentFormData) => {
    if (!currentUser) {
      if (!data.name || data.name.trim().length < 2) {
        form.setError('name', { message: 'Введите имя (минимум 2 символа)' });
        return;
      }
      if (!data.email || !data.email.includes('@')) {
        form.setError('email', { message: 'Введите корректный email' });
        return;
      }
    }

    try {
      await createComment.mutateAsync({
        postId,
        userId: currentUser?.id || '',
        name: currentUser?.name || data.name,
        email: currentUser?.email || data.email,
        body: data.body,
      });

      form.reset({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        body: '',
      });
      toast.success('Комментарий добавлен!');
      onSuccess?.();
    } catch {
      toast.error('Ошибка при добавлении комментария');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {!currentUser && (
        <div className="grid grid-cols-2 gap-4">
          <FormField
            id="comment-name"
            label="Имя"
            error={form.formState.errors.name?.message}
          >
            <Input
              id="comment-name"
              {...form.register('name')}
              placeholder="Ваше имя"
            />
          </FormField>

          <FormField
            id="comment-email"
            label="Email"
            error={form.formState.errors.email?.message}
          >
            <Input
              id="comment-email"
              type="email"
              {...form.register('email')}
              placeholder="your@email.com"
            />
          </FormField>
        </div>
      )}

      <FormField
        id="comment-body"
        label="Комментарий"
        error={form.formState.errors.body?.message}
        className="space-y-2"
      >
        <div className="flex flex-col gap-4">
          <Textarea
            id="comment-body"
            {...form.register('body')}
            placeholder="Напишите ваш комментарий..."
            className="flex-1 min-h-[80px] resize-none"
            rows={3}
          />
          <Button
            type="submit"
            disabled={createComment.isPending || form.formState.isSubmitting}
            className="gap-2 self-start"
          >
            <Send className="h-4 w-4" />
            {createComment.isPending ? 'Отправка...' : 'Отправить'}
          </Button>
        </div>
      </FormField>
    </form>
  );
}
