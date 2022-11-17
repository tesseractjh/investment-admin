import { useEffect } from 'react';
import { useSetTableQuery } from '@hooks/table';
import { useRouter } from 'next/router';

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

  useEffect(() => {
    const { limit: _limit } = router.query;
    if (!_limit) {
      setLimit(limit);
    }
  }, [router.query]);

  return [heads, rows] as const;
}
