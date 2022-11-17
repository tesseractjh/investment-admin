import { useEffect } from 'react';
import { useTableQueryValue } from '@hooks/table';
import { useRouter } from 'next/router';
import { useRecoilCallback } from 'recoil';
import { tableState } from '@recoil/table';
import setQueryParams from '@utils/setQueryParams';

type Row = {
  id: number;
  datas: (string | number)[];
};

export default function useTable<T extends Record<string, unknown>>(
  columns: Record<string, string>,
  data: T[],
  dataConverter: (data: T[]) => Record<string, string | number>[],
  tableId: string,
  limit: string
) {
  const page = useTableQueryValue(tableId, 'page');
  const router = useRouter();

  const heads = Object.values(columns);
  const rows: Row[] = dataConverter(data).map((row, index) => ({
    id: index,
    datas: Object.keys(columns).reduce<(string | number)[]>((acc, column) => {
      acc.push(row[column]);
      return acc;
    }, []),
  }));

  const initiateTableQueryState = useRecoilCallback(({ set }) => async (queries: [string, unknown][]) => {
    queries.forEach(([key, value]) => {
      set(tableState([tableId, key]), String(value));
    });
  });

  useEffect(() => {
    const { page: _page, limit: _limit } = router.query;
    if (!_page) {
      setQueryParams({ page });
    }
    if (!_limit) {
      setQueryParams({ limit });
    }
    initiateTableQueryState(Object.entries(router.query));
  }, [router.query]);

  return [heads, rows] as const;
}
