import type { ApiResponse } from '#/types/api';
import type {
  AppKey,
  CreateAppKeyRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from '#/types/auth';

import { requestClient } from '../request';

export function login(data: LoginRequest) {
  return requestClient.post<ApiResponse<LoginResponse>>('/v1/user/login', data);
}

export function register(data: RegisterRequest) {
  return requestClient.post<ApiResponse<User>>('/v1/user/register', data);
}

export function getUser(user_id: string) {
  return requestClient.get<ApiResponse<User>>('/v1/user/get', {
    params: { user_id },
  });
}

export function createAppKey(data: CreateAppKeyRequest) {
  return requestClient.post<ApiResponse<AppKey>>('/v1/app/create', data);
}
