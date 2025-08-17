import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен').max(200, 'Заголовок слишком длинный'),
  body: z.string().min(1, 'Содержимое обязательно').max(5000, 'Содержимое слишком длинное'),
  imageUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  tags: z.array(z.string()),
  priority: z.number().min(1, 'Приоритет должен быть от 1').max(10, 'Приоритет должен быть до 10').optional(),
});

export type PostFormData = z.infer<typeof postSchema>;
