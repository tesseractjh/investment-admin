import { BROKERS } from '@constants/brokers';
import { ACCOUNT_STATE } from '@constants/accounts';
import getQueryString from '@utils/getQueryString';
import { apiClient } from '..';
import type { ResponseData } from '..';

export type AccountResponse = {
  id: number;
  user_id: number;
  uuid: string;
  broker_id: keyof typeof BROKERS;
  status: keyof typeof ACCOUNT_STATE;
  number: string;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

const converter = (key: string) => {
  switch (key) {
    case 'page':
      return '_page';
    case 'limit':
      return '_limit';
    default:
      return key;
  }
};

export const getAccounts = async (params: Record<string, unknown>) => {
  const result = await apiClient.get<AccountResponse[], ResponseData<AccountResponse[]>>(
    `/accounts?${getQueryString(params, converter)}`
  );
  return result;
};
