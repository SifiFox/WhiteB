import { z } from 'zod';

export const editProfileSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  username: z.string().min(3, 'Имя пользователя должно содержать минимум 3 символа'),
  email: z.string().email('Некорректный email адрес'),
  phone: z.string().min(10, 'Телефон должен содержать минимум 10 символов'),
  website: z.string().url('Некорректный URL').optional().or(z.literal('')),
  bio: z.string().max(500, 'Биография не должна превышать 500 символов').optional(),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;
