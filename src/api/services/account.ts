import { apiClient } from '..';
import type { ResponseData } from '..';

export type AccountResponse = {
  id: number;
  user_id: number;
  uuid: string;
  broker_id: string;
  status: number;
  number: string;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export const getAccounts = async () => {
  const result = await apiClient.get<AccountResponse, ResponseData<AccountResponse>>('/accounts');
  return result;
};
