import { useEffect } from 'react';
import { useSetTableQuery } from '@hooks/table';
import { useRouter } from 'next/router';
import { useRecoilCallback } from 'recoil';
import { tableState } from '@recoil/table';

type Row = {
  id: number;
  datas: (string | number)[];
};

export default function useTable<T extends Record<string, unknown>>(
  columns: Record<string, string>,
  data: T[],
  dataConverter: (data: T[]) => Record<string, string | number>[],
  tableId: string,
  limit: number
) {
  const setPage = useSetTableQuery(tableId, 'page');
  const setLimit = useSetTableQuery(tableId, 'limit');
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
    const { page, limit: _limit } = router.query;
    if (!page) {
      setPage(String(page));
    }
    if (!_limit) {
      setLimit(String(limit));
    }
    initiateTableQueryState(Object.entries(router.query));
  }, [router.query]);

  return [heads, rows] as const;
}
