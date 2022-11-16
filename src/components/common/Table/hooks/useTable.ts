type Row = {
  id: number;
  datas: (string | number)[];
};

export default function useTable<T extends Record<string, string | number>>(
  columns: Record<string, string>,
  data: T[]
) {
  const heads = Object.values(columns);
  const rows: Row[] = data.map((row, index) => ({
    id: index,
    datas: Object.keys(columns).reduce<(string | number)[]>((acc, column) => {
      acc.push(row[column]);
      return acc;
    }, []),
  }));
  return [heads, rows] as const;
}
