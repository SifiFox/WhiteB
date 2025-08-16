export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  website: string;
  isAdmin: boolean;
  avatar: string;
  bio: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  priority: number;
  tags: string[];
  imageUrl?: string;
}

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  name: string;
  email: string;
  body: string;
  createdAt: string;
  likes: number;
  dislikes: number;
}

export interface Favorite {
  id: number;
  userId: number;
  postId: number;
}

export interface Like {
  id: number;
  userId: number;
  postId: number;
  type: 'like' | 'dislike';
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface PostWithUser extends Post {
  user: User;
  comments?: Comment[];
  isFavorite?: boolean;
  userLike?: 'like' | 'dislike' | null;
}

export interface CreatePostData {
  title: string;
  body: string;
  userId: number;
  tags: string[];
  imageUrl?: string;
}

export interface CreateCommentData {
  postId: number;
  userId: number;
  name: string;
  email: string;
  body: string;
}

export interface LoginData {
  login: string;
  password: string;
}

export interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  website?: string;
  bio?: string;
}

export type AuthUser = Omit<User, 'password'>;

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface UpdateUserData {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
  bio?: string;
  avatar?: string;
}
