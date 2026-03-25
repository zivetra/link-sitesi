// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface UserWithoutPassword {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

// Link Types
export interface Link {
  id: string;
  userId: string;
  platformName: string;
  url: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  clicks?: number; // Tıklama sayısı
}

// Profile Types
export interface Profile {
  id: string;
  userId: string;
  bio: string;
  avatar: string;
  theme: 'light' | 'dark' | 'purple';
  customUrl: string;
  layout?: 'classic' | 'minimal' | 'card' | 'elite';
  backgroundType?: 'solid' | 'gradient' | 'image' | 'animated' | 'gif';
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundGif?: string;
  backgroundMusic?: string;
  buttonStyle?: 'fill' | 'outline' | 'shadow' | 'gradient' | 'glass' | 'neon';
  buttonColor?: string;
  buttonTextColor?: string;
  cornerRadius?: 'none' | 'small' | 'medium' | 'full';
  fontStyle?: 'sans' | 'serif' | 'mono';
}

// Platform Types
export interface Platform {
  name: string;
  icon: string;
  color: string;
  placeholder: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface RegisterResponse extends ApiResponse {
  user?: User;
}

export interface LoginResponse extends ApiResponse {
  user?: UserWithoutPassword;
}

export interface LinkResponse extends ApiResponse {
  link?: Link;
}

export interface ProfileResponse extends ApiResponse {
  profile?: Profile;
}

// Storage Keys
export type StorageKey = 'linkhub_users' | 'linkhub_current_user' | 'linkhub_links' | 'linkhub_profiles';
