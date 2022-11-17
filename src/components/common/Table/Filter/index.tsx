import styled from 'styled-components';
import FilterOptions from './FilterOptions';

export type TableFilter = {
  id: string;
  label: string;
  options: {
    option: string;
    value: unknown;
  }[];
};

type Props = {
  tableId: string;
  filters: TableFilter[];
};

export default function Filter({ tableId, filters }: Props) {
  return (
    <Container>
      {filters.map((filter) => (
        <FilterOptions key={filter.id} tableId={tableId} filter={filter} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.mixin.flex('space-between', 'center', '10px')}
`;
