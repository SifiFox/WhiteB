import { z } from 'zod';

export const commentSchema = z.object({
  name: z
    .string()
    .max(50, 'Имя не может быть длиннее 50 символов'),

  email: z
    .string()
    .max(100, 'Email не может быть длиннее 100 символов'),

  body: z
    .string()
    .min(1, 'Введите текст комментария')
    .min(3, 'Комментарий должен содержать минимум 3 символа')
    .max(1000, 'Комментарий не может быть длиннее 1000 символов'),
});

export type CommentFormData = z.infer<typeof commentSchema>;
