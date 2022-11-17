import API from '@api/index';
import { ACCOUNTS_QUERY_OPTIONS } from '@constants/queryOptions';
import { useQuery } from '@tanstack/react-query';

export default function usePaginationQuery(tableId: string, params: Record<string, string>) {
  const { data } = useQuery(
    [tableId, { ...params, page: String(Number(params.page) + 1) }],
    () => API.account.getAccounts({ ...params, page: String(Number(params.page) + 1) }),
    ACCOUNTS_QUERY_OPTIONS
  );
  return data;
}
