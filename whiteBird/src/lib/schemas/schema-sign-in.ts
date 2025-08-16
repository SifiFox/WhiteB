import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

export const signInSchema = z.object({
  login: z
    .string()
    .min(1, 'Email или логин обязателен')
    .refine(
      (value) => emailRegex.test(value) || usernameRegex.test(value),
      'Введите корректный email или логин (3-20 символов, только буквы, цифры и _)',
    ),
  password: z
    .string()
    .min(1, 'Пароль обязателен')
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .max(50, 'Пароль слишком длинный'),
});

export type SignInFormData = z.infer<typeof signInSchema>;
