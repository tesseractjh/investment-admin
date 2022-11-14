import { apiClient } from '..';
import type { ResponseData } from '..';

type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user?: LoginRequest;
};

export const login = async (formData: LoginRequest) => {
  const result = await apiClient.post<LoginResponse, ResponseData<LoginResponse>>('/login', formData);
  return result;
};

export const auth = async () => {
  const {
    data: { error },
  } = await apiClient.get<ResponseData<unknown>>('/users');
  return !error;
};
