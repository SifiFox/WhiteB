# 📋 White Bird Forum

## **Deploy:** https://whitebtest.netlify.app/ 
## **DB:** https://forum-kfrc.onrender.com/ 

## ✅ **Основная инфраструктура**
- [x] Создать каркас через сборщик (Vite + React)
- [x] Использовать исключительно хуки, без классовых компонентов
- [x] Настроить TypeScript
- [x] Подключить API (json-server с локальной базой)
- [x] Современный дизайн (TailwindCSS + Shadcn/ui)

## ✅ **Пользователи**
- [x] Отображение списка пользователей
- [x] Страница пользователей с роутингом (`/users`)

## ✅ **Посты**
- [x] Отображение всех постов
- [x] Фильтрация постов по пользователям
- [x] Отдельная страница для каждого поста (`/posts/$postId`)
- [x] Создание постов
- [x] Удаление постов
- [x] Лайки/дизлайки на посты
- [x] Добавление постов в избранное

## ✅ **Комментарии**
- [x] Просмотр комментариев к постам
- [x] Добавление комментариев (с формой и валидацией)
- [x] Поддержка комментариев для авторизованных и неавторизованных пользователей

## ✅ **Личный кабинет**
- [x] Страница профиля (`/profile`)
- [x] Просмотр информации пользователя
- [x] Редактирование профиля (имя, email, адрес и т.д.)
- [x] Отображение избранных постов в профиле

## ✅ **Админка (со звёздочкой)**
- [x] Проверка прав доступа админа
- [x] Страница со всеми пользователями для админа
- [x] Редактирование информации о пользователях
- [x] Задание приоритета постам (поднятие в топы)

## ✅ **Дополнительные функции**
- [x] Авторизация и аутентификация
- [x] Роутинг с TanStack Router
- [x] Валидация форм с Zod + React Hook Form
- [x] State management с TanStack Query
- [x] Адаптивный дизайн
- [x] Обработка состояний загрузки и ошибок
- [x] Типизация с TypeScript

## ✅ **Деплой и настройка**
- [x] Настройка для деплоя на Netlify
- [x] Конфигурация редиректов для SPA
- [x] Favicon и мета-теги
- [x] Оптимизация сборки

### **Технический стек:**
- **Frontend:** React 19 + TypeScript + Vite
- **Роутинг:** TanStack Router (file-based routing)
- **UI:** TailwindCSS + Shadcn/ui
- **Формы:** React Hook Form + Zod валидация
- **State:** TanStack Query + React hooks
- **API:** JSON Server ([локальная база данных](https://github.com/SifiFox/forum) деплой на render.com)
- **Деплой:** Netlify-ready конфигурация

**Welcome page**
<img width="1555" height="766" alt="image" src="https://github.com/user-attachments/assets/390c7478-1104-4211-9b8a-556270748714" />

**Posts page (admin)**
<img width="1552" height="788" alt="image" src="https://github.com/user-attachments/assets/1a16c0e5-e66f-4e88-8139-b8ecda211cc4" />

**Posts page (user)**
<img width="1542" height="782" alt="image" src="https://github.com/user-attachments/assets/d7277cc6-f6c9-4a70-b1d1-457498d295e2" />

**Posts page (unauthorized)**
<img width="1554" height="767" alt="image" src="https://github.com/user-attachments/assets/b66154c5-1a51-4f19-afa8-e1655685de6d" />

**Filter posts by user**
<img width="1611" height="807" alt="image" src="https://github.com/user-attachments/assets/48bae36e-17aa-4cc6-a363-152f81164aac" />

**Post Detail page**
<img width="1535" height="937" alt="image" src="https://github.com/user-attachments/assets/9f756a15-fe9e-4383-8935-d653c616ed93" />

**Comments: authorizend and unauthorized view**
<img width="1539" height="447" alt="image" src="https://github.com/user-attachments/assets/2ecae591-862a-4c62-92ea-71a2f4e85a69" />
<img width="1561" height="834" alt="image" src="https://github.com/user-attachments/assets/b9ce998c-7afa-4f99-bda9-48f8440291b8" />

**Profile admin**
<img width="1541" height="823" alt="image" src="https://github.com/user-attachments/assets/c5267ee2-aa43-4fbc-b504-6098b3685512" />
<img width="1545" height="656" alt="image" src="https://github.com/user-attachments/assets/bd22aa69-bdda-4bf6-86de-07634c9dad6e" />

**Profile user**
<img width="1537" height="928" alt="image" src="https://github.com/user-attachments/assets/747d12e4-0f7d-4b22-927e-9e9a4136ccc5" />

**Edit user**
<img width="1541" height="685" alt="image" src="https://github.com/user-attachments/assets/33f727d9-bd09-400e-86f4-9d6de10db4f3" />

**Edit self post by user**
<img width="1541" height="793" alt="image" src="https://github.com/user-attachments/assets/924ba4c7-da43-4ed7-980f-38c6f8264cde" />

**Edit post by admin**
<img width="1549" height="802" alt="image" src="https://github.com/user-attachments/assets/8c4b8853-007d-4701-b9af-c3dd49b77d0d" />

**Users page (available only for admin)**
<img width="1537" height="816" alt="image" src="https://github.com/user-attachments/assets/9a62cace-da80-42ec-a301-64250c57a613" />

**Registration**
<img width="1573" height="642" alt="image" src="https://github.com/user-attachments/assets/9549fcfd-4e59-4335-be47-272f8cefeda5" />
<img width="1546" height="512" alt="image" src="https://github.com/user-attachments/assets/ac07f638-f610-4123-852a-00d33da8ff9d" />

**Login**
<img width="1557" height="531" alt="image" src="https://github.com/user-attachments/assets/52e32058-4ec8-47fb-aa22-0e8763ffe34e" />
