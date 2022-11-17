import { useQueries } from '@tanstack/react-query';
import type { AccountResponse } from '@api/services/account';
import type { ResponseData } from '@api/index';
import API from '@api/index';
import { useTableQueryValue, useAccountQueryState } from '@hooks/table';
import { ACCOUNTS_QUERY_OPTIONS } from '@constants/queryOptions';

const accountsQuery = (
  initialData: ResponseData<AccountResponse[]>,
  initialQuery: Record<string, string>,
  params: Record<string, string>
) => {
  const query = {
    queryKey: ['accounts', params],
    queryFn: () => API.account.getAccounts(params),
    ...ACCOUNTS_QUERY_OPTIONS,
  };
  if (
    Object.keys(params).length === Object.keys(initialQuery).length &&
    Object.keys(params).every((key) => initialQuery[key] === params[key])
  ) {
    return { ...query, initialData };
  }
  return query;
};

export default function useAccountsQueries(
  initialData: [ResponseData<AccountResponse[]>, ResponseData<AccountResponse[]>],
  initialQuery: Record<string, string>
) {
  const page = useTableQueryValue('accounts', 'page');
  const accountsQueryState = useAccountQueryState();
  const [curPageData, nextPageData] = initialData;

  return useQueries({
    queries: [
      accountsQuery(curPageData, initialQuery, accountsQueryState),
      accountsQuery(nextPageData, initialQuery, { ...accountsQueryState, page: String(Number(page) + 1) }),
    ],
  });
}
