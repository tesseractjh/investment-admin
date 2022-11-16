import { useRecoilValue } from 'recoil';
import { useQueries } from '@tanstack/react-query';
import { tablePageState } from '@recoil/table';
import API from '@api/index';
import { ACCOUNTS_QUERY_OPTIONS } from '@constants/queryOptions';

const accountsQuery = (page: number, limit: number) => ({
  queryKey: ['accounts', { page, limit }],
  queryFn: () => API.account.getAccounts({ page, limit }),
  ...ACCOUNTS_QUERY_OPTIONS,
});

export default function useAccountsQueries(limit: number) {
  const page = useRecoilValue(tablePageState('accounts'));
  return useQueries({
    queries: [accountsQuery(page, limit), accountsQuery(page + 1, limit)],
  });
}
