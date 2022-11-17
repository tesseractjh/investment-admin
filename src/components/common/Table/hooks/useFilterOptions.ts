import { useSetTableQuery, useTableQueryState } from '@hooks/table';

export default function useFilterOptions(tableId: string, filterId: string) {
  const setPage = useSetTableQuery(tableId, 'page');
  const [filterState, setFilterState] = useTableQueryState(tableId, filterId);

  const handleChange = ({ currentTarget: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterState(value);
    setPage('1');
  };

  return { value: filterState, handleChange };
}
