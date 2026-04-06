export interface LoginRequest {
  username: string;
  password: string;
  app_id?: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface RefreshTokenRequest {
  refresh_token: string;
  app_id?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  platform_id: string;
  product_id: string;
  status: number;
  created_at: number;
  updated_at: number;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email?: string;
  phone?: string;
  platform_id?: string;
  product_id?: string;
}

export interface AppKey {
  id: string;
  app_id: string;
  app_secret: string;
  name: string;
  platform_id: string;
  product_id: string;
  status: number;
  created_at: number;
  updated_at: number;
}

export interface CreateAppKeyRequest {
  name: string;
  platform_id: string;
  product_id: string;
}
