import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TagInput } from '@/components/ui/tag-input';
import { FormField } from '@/components/ui/forms/form-field';
import { postSchema, type PostFormData } from '@/lib/schemas/schema-post';
import { useCreatePost, useUpdatePost } from '@/lib/hooks/use-posts';
import { useCurrentUser, useIsAdmin } from '@/lib/hooks/use-auth';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import type { Post } from '@/lib/types';

interface FormPostProps {
  post?: Post;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function FormPost({ post, onSuccess, onCancel }: FormPostProps) {
  const { data: currentUser } = useCurrentUser();
  const isAdmin = useIsAdmin();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const isEditing = !!post;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || '',
      body: post?.body || '',
      imageUrl: post?.imageUrl || '',
      tags: post?.tags || [],
      priority: post?.priority || 1,
    },
  });

  const onSubmit = async (data: PostFormData) => {
    if (!currentUser) {
      setError('root', { message: 'Необходимо авторизоваться' });
      return;
    }

    try {
      const postData = {
        ...data,
        imageUrl: data.imageUrl || undefined,
      };

      if (isEditing) {
        await updatePost.mutateAsync({
          id: post.id,
          data: postData,
        });
        toast.success('Пост успешно обновлен');
      } else {
        await createPost.mutateAsync({
          ...postData,
          userId: currentUser.id,
        });
        toast.success('Пост успешно создан');
      }

      onSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Произошла ошибка';
      setError('root', { message });
      toast.error(message);
    }
  };

  const isPending = createPost.isPending || updatePost.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        id="title"
        label="Заголовок"
        error={errors.title?.message}
      >
        <Input
          id="title"
          placeholder="Введите заголовок поста"
          {...register('title')}
          disabled={isSubmitting || isPending}
        />
      </FormField>

      <FormField
        id="body"
        label="Содержимое"
        error={errors.body?.message}
      >
        <Textarea
          id="body"
          placeholder="Напишите содержимое поста..."
          rows={8}
          {...register('body')}
          disabled={isSubmitting || isPending}
        />
      </FormField>

      <FormField
        id="imageUrl"
        label="Изображение (необязательно)"
        error={errors.imageUrl?.message}
      >
        <Input
          id="imageUrl"
          type="url"
          placeholder="https://example.com/image.jpg"
          {...register('imageUrl')}
          disabled={isSubmitting || isPending}
        />
      </FormField>

      <FormField
        id="tags"
        label="Теги"
        error={errors.tags?.message}
      >
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <TagInput
              tags={field.value}
              onChange={field.onChange}
              placeholder="Добавить тег..."
              disabled={isSubmitting || isPending}
            />
          )}
        />
      </FormField>

      {isAdmin && (
        <FormField
          id="priority"
          label="Приоритет (1-10)"
          error={errors.priority?.message}
        >
          <Input
            id="priority"
            type="number"
            min="1"
            max="10"
            placeholder="1"
            {...register('priority', { valueAsNumber: true })}
            disabled={isSubmitting || isPending}
          />
        </FormField>
      )}

      {errors.root && (
        <p className="text-sm text-destructive">{errors.root.message}</p>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting || isPending}
          className="flex-1"
        >
          {(isSubmitting || isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEditing ? 'Обновить пост' : 'Создать пост'}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting || isPending}
        >
          Отмена
        </Button>
      </div>
    </form>
  );
}
