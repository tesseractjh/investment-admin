import { getAPI } from '..';
import type { ResponseData } from '..';

export type UserResponse = {
  id: number;
  uuid: string;
  photo: string;
  name: string;
  email: string;
  age: number;
  gender_origin: number;
  birth_date: string;
  phone_number: string;
  address: string;
  detail_address: string;
  last_login: string;
  created_at: string;
  updated_at: string;
};

export const getUsers = async () => {
  const result = await getAPI().get<UserResponse[], ResponseData<UserResponse[]>>('/users');
  return result;
};
