import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import type { AccountResponse } from '@api/services/account';
import type { ResponseData } from '@api/index';
import API from '@api/index';
import useQueryParams from '@hooks/useQueryParams';
import { useTableQueryState } from '@hooks/table';
import { ACCOUNTS_QUERY_OPTIONS } from '@constants/queryOptions';

const accountsQuery = (
  initialData: ResponseData<AccountResponse[]>,
  initialQuery: { page: number; limit: number },
  page: number,
  limit: number
) => {
  const { page: _page, limit: _limit } = initialQuery;
  const query = {
    queryKey: ['accounts', { page, limit }],
    queryFn: () => API.account.getAccounts({ page, limit }),
    ...ACCOUNTS_QUERY_OPTIONS,
  };
  if (page === _page && limit === _limit) {
    return { ...query, initialData };
  }
  return query;
};

export default function useAccountsQueries(
  initialData: [ResponseData<AccountResponse[]>, ResponseData<AccountResponse[]>],
  initialQuery: { page: number; limit: number }
) {
  const [page, setPage] = useTableQueryState('accounts', 'page');
  const [limit, setLimit] = useTableQueryState('accounts', 'limit');
  const router = useRouter();

  const setQueryParams = useQueryParams();
  const [curPageData, nextPageData] = initialData;

  // queryparams가 없는 경우에는 window로 초기화해주고
  // queryparams가 있는 경우에는 queryparams값으로 recoil table state 업데이트하기
  useEffect(() => {
    const { page: _page, limit: _limit } = router.query;
    if (!_page || !_limit) {
      setQueryParams({ page, limit });
    } else {
      setPage(Number(_page));
      setLimit(Number(_limit));
    }
  }, [router.query]);

  return useQueries({
    queries: [
      accountsQuery(curPageData, initialQuery, page, limit),
      accountsQuery(nextPageData, initialQuery, page + 1, limit),
    ],
  });
}
