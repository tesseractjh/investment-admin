import { getAPI } from '..';
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
  const result = await getAPI().post<LoginResponse, ResponseData<LoginResponse>>('/login', formData);
  return result;
};

export const auth = async () => {
  const { error } = await getAPI().get<unknown, ResponseData<unknown>>('/users');
  return !error;
};
