import getQueryString from '@utils/getQueryString';
import { useRouter } from 'next/router';

export default function useQueryParams(defaultLimit: number) {
  const router = useRouter();
  const { page: _page = 1, limit: _limit = defaultLimit } = router.query;

  const page = Number(_page);
  const limit = Number(_limit);

  const setQueryParams = (params: Record<string, string | number>) => {
    router.push(`${router.pathname}?${getQueryString({ ...router.query, ...params })}`);
  };

  return { query: { page, limit }, setQueryParams };
}
