import { useQueries } from '@tanstack/react-query';
import type { AccountResponse } from '@api/services/account';
import type { ResponseData } from '@api/index';
import API from '@api/index';
import { ACCOUNTS_QUERY_OPTIONS } from '@constants/queryOptions';
import useQueryParams from '@hooks/useQueryParams';
import { useEffect } from 'react';

const accountsQuery = (initialData: ResponseData<AccountResponse[]>, page: number, limit: number) => ({
  queryKey: ['accounts', { page, limit }],
  queryFn: () => API.account.getAccounts({ page, limit }),
  initialData,
  ...ACCOUNTS_QUERY_OPTIONS,
});

export default function useAccountsQueries(
  initialData: [ResponseData<AccountResponse[]>, ResponseData<AccountResponse[]>],
  defaultLimit: number
) {
  const {
    query: { page, limit },
    setQueryParams,
  } = useQueryParams(defaultLimit);
  const [curPageData, nextPageData] = initialData;

  useEffect(() => {
    setQueryParams({ page, limit });
  }, []);

  return useQueries({
    queries: [accountsQuery(curPageData, page, limit), accountsQuery(nextPageData, page + 1, limit)],
  });
}
