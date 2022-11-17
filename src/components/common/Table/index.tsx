import theme from '@styles/theme';
import styled from 'styled-components';
import Pagination from './Pagination';
import useTable from './hooks/useTable';

type ColumnStyle = {
  width?: number;
  color?: keyof typeof theme['color'];
};

type Props<T> = {
  tableId: string;
  columns: Record<string, string>;
  data: T[];
  dataConverter: (data: T[]) => Record<string, string | number>[];
  limit: number;
  minWidth?: number;
  maxWidth?: number;
  columnStyles?: ColumnStyle[];
};

export default function Table<T extends Record<string, unknown>>({
  tableId,
  columns,
  data,
  dataConverter,
  limit,
  minWidth,
  maxWidth,
  columnStyles,
}: Props<T>) {
  const [heads, rows] = useTable(columns, data, dataConverter, tableId, limit);

  return (
    <Container>
      <TableMenuContainer>
        필터
        <Pagination tableId={tableId} />
      </TableMenuContainer>
      <TableWrapper>
        <StyledTable minWidth={minWidth} maxWidth={maxWidth}>
          <thead>
            <Row>
              {heads.map((head, index) => (
                <Head key={head} columnStyle={columnStyles?.[index]}>
                  {head}
                </Head>
              ))}
            </Row>
          </thead>
          <tbody>
            {rows.map(({ id, datas }) => (
              <Row key={id}>
                {datas.map((data, index) => (
                  <Data key={data} columnStyle={columnStyles?.[index]}>
                    {data}
                  </Data>
                ))}
              </Row>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </Container>
  );
}

const Container = styled.div``;

const TableMenuContainer = styled.div`
  ${({ theme }) => theme.mixin.flex('space-between')}
  padding: 10px 20px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.color.BORDER};
  background-color: ${({ theme }) => theme.color.WHITE};
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  box-shadow: 0 7px 20px rgb(0 0 0 / 17%);
`;

const StyledTable = styled.table<{ minWidth?: number; maxWidth?: number }>`
  ${({ minWidth }) => (minWidth ? `min-width: ${minWidth}px;` : '')}
  ${({ maxWidth }) => (maxWidth ? `max-width: ${maxWidth}px;` : '')}
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
`;

const Row = styled.tr`
  font-size: 16px;

  & > th,
  & > td {
    padding: 10px 16px;
  }
`;

const Head = styled.th<{ columnStyle?: ColumnStyle }>`
  border: 1px solid ${({ theme }) => theme.color.BORDER};
  background-color: ${({ theme }) => theme.color.BACKGROUND};
  font-weight: 700;
  text-align: center;
  word-break: keep-all;
  ${({ columnStyle }) =>
    columnStyle
      ? `
        ${columnStyle.width ? `width: ${columnStyle.width}%;` : ''}
      `
      : ''}
`;

const Data = styled.td<{ columnStyle?: ColumnStyle }>`
  border: 1px solid ${({ theme }) => theme.color.BORDER};
  background-color: ${({ theme }) => theme.color.WHITE};
  text-align: right;
  ${({ columnStyle, theme }) =>
    columnStyle
      ? `
        ${columnStyle.width ? `width: ${columnStyle.width}%;` : ''}
        ${columnStyle.color ? `color: ${theme.color[columnStyle.color]}; font-weight: 700;` : ''}
      `
      : ''}
`;
