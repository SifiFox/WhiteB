import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';

const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s]{2,50}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const urlRegex = /^https?:\/\/.+\..+/;

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, 'Имя обязательно')
    .regex(nameRegex, 'Имя должно содержать только буквы и пробелы (2-50 символов)'),
  username: z
    .string()
    .min(1, 'Username обязателен')
    .regex(usernameRegex, 'Username: 3-20 символов, только буквы, цифры и _'),
  email: z
    .string()
    .min(1, 'Email обязателен')
    .email('Некорректный email'),
  password: z
    .string()
    .min(1, 'Пароль обязателен')
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .max(50, 'Пароль слишком длинный')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)/,
      'Пароль должен содержать хотя бы одну букву и одну цифру',
    ),
  phone: z
    .string()
    .min(1, 'Телефон обязателен')
    .refine((phone) => isValidPhoneNumber(phone), 'Некорректный номер телефона'),
  website: z
    .string()
    .optional()
    .refine(
      (val) => !val || urlRegex.test(val),
      'Сайт должен начинаться с http:// или https://',
    ),
  bio: z
    .string()
    .optional()
    .refine((val) => !val || val.length <= 500, 'Описание не должно превышать 500 символов'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
