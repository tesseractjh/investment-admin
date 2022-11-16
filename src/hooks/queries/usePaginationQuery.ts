import API from '@api/index';
import { ACCOUNTS_QUERY_OPTIONS } from '@constants/queryOptions';
import { useQuery } from '@tanstack/react-query';

export default function usePaginationQuery(tableId: string, page: number, limit: number) {
  const { data } = useQuery(
    [tableId, { page: page + 1, limit }],
    () => API.account.getAccounts({ page: page + 1, limit }),
    ACCOUNTS_QUERY_OPTIONS
  );
  return data;
}
