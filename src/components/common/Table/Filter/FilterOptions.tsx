import Dropdown from '@components/common/Dropdown';
import type { TableFilter } from '.';
import useFilterOptions from '../hooks/useFilterOptions';

type Props = {
  tableId: string;
  filter: TableFilter;
};

export default function FilterOptions({ tableId, filter }: Props) {
  const { value, handleChange } = useFilterOptions(tableId, filter.id);
  return <Dropdown filter={filter} value={value} handleChange={handleChange} />;
}
