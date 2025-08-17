export interface User {
  id: string;
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
  id: string;
  title: string;
  body: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  priority: number;
  tags: string[];
  imageUrl?: string;
}

export type PostsSearch = {
  userId?: string;
};

export interface PostDetailParams {
  postId: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  name: string;
  email: string;
  body: string;
  createdAt: string;
  likes: number;
  dislikes: number;
}

export interface Favorite {
  id: string;
  userId: string;
  postId: string;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  type: 'like' | 'dislike';
}

export interface Tag {
  id: string;
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
  userId: string;
  tags: string[];
  imageUrl?: string;
}

export interface CreateCommentData {
  postId: string;
  userId: string;
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
