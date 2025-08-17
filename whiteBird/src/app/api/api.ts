import type {
  User,
  Post,
  Comment,
  Favorite,
  Like,
  Tag,
  LoginData,
  RegisterData,
  AuthResponse,
  CreatePostData,
  CreateCommentData,
  UpdateUserData,
  AuthUser,
} from '@/lib/types';

export const api = {
  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${import.meta.env.VITE_API_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  getUsers: () => api.request<User[]>('/users'),
  getUserById: (id: string) => api.request<User>(`/users/${id}`),
  updateUser: (id: string, data: UpdateUserData) =>
    api.request<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  getPosts: (params?: Record<string, string | number>) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, value.toString());
      });
    }
    const query = searchParams.toString();
    return api.request<Post[]>(`/posts${query ? `?${query}` : ''}`);
  },

  getPostById: (id: string) => api.request<Post>(`/posts/${id}`),

  createPost: (data: CreatePostData) => {
    const newPost = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      priority: 1,
    };
    return api.request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(newPost),
    });
  },

  updatePost: (id: string, data: Partial<Post>) =>
    api.request<Post>(`/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...data,
        updatedAt: new Date().toISOString(),
      }),
    }),

  deletePost: (id: string) =>
    api.request(`/posts/${id}`, { method: 'DELETE' }),

  getCommentsByPostId: (postId: string) =>
    api.request<Comment[]>(`/comments?postId=${postId}`),

  createComment: (data: CreateCommentData) => {
    const newComment = {
      ...data,
      createdAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
    };
    return api.request<Comment>('/comments', {
      method: 'POST',
      body: JSON.stringify(newComment),
    });
  },

  getFavorites: (userId: string) =>
    api.request<Favorite[]>(`/favorites?userId=${userId}`),

  addToFavorites: (userId: string, postId: string) =>
    api.request<Favorite>('/favorites', {
      method: 'POST',
      body: JSON.stringify({ userId, postId }),
    }),

  removeFromFavorites: (favoriteId: string) =>
    api.request(`/favorites/${favoriteId}`, { method: 'DELETE' }),

  getLikes: (postId?: string) => {
    const query = postId ? `?postId=${postId}` : '';
    return api.request<Like[]>(`/likes${query}`);
  },

  createLike: (userId: string, postId: string, type: 'like' | 'dislike') =>
    api.request<Like>('/likes', {
      method: 'POST',
      body: JSON.stringify({ userId, postId, type }),
    }),

  updateLike: (id: string, type: 'like' | 'dislike') =>
    api.request<Like>(`/likes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ type }),
    }),

  deleteLike: (id: string) =>
    api.request(`/likes/${id}`, { method: 'DELETE' }),

  getTags: () => api.request<Tag[]>('/tags'),

  async getCurrentUser(): Promise<AuthUser | null> {
    const token = localStorage.getItem('auth-token');
    if (!token) return null;

    try {
      const userId = token.replace('fake-jwt-token-', '');
      if (!userId || isNaN(Number(userId))) return null;

      const user = await api.getUserById(userId);
      const { password: _password, ...authUser } = user;
      void _password;

      return authUser;
    } catch {
      localStorage.removeItem('auth-token');
      return null;
    }
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const users = await api.getUsers();
    const user = users.find(u =>
      (u.email === data.login || u.username === data.login) &&
      u.password === data.password,
    );

    if (!user) {
      throw new Error('Неверный email/логин или пароль');
    }

    const { password: _password, ...authUser } = user;
    void _password;

    return {
      user: authUser,
      token: `fake-jwt-token-${user.id}`,
    };
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const users = await api.getUsers();

    if (users.some(u => u.email === data.email)) {
      throw new Error('Пользователь с таким email уже существует');
    }

    if (users.some(u => u.username === data.username)) {
      throw new Error('Пользователь с таким username уже существует');
    }

    const newUser = {
      ...data,
      isAdmin: false,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    const createdUser = await api.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
    });

    const { password: _password, ...authUser } = createdUser;
    void _password;

    return {
      user: authUser,
      token: `fake-jwt-token-${createdUser.id}`,
    };
  },
};
