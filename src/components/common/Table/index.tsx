import theme from '@styles/theme';
import type { CSSProperties } from 'styled-components';
import styled from 'styled-components';
import useTable from './hooks/useTable';

type ColumnStyle = {
  width?: number;
  align?: CSSProperties['textAlign'];
  color?: keyof typeof theme['color'];
};

type Props<T> = {
  columns: Record<string, string>;
  data: T[];
  width?: number;
  columnStyles?: ColumnStyle[];
};

export default function Table<T extends Record<string, string | number>>({
  columns,
  data,
  width,
  columnStyles,
}: Props<T>) {
  const [heads, rows] = useTable(columns, data);

  return (
    <Container $width={width}>
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
    </Container>
  );
}

const Container = styled.table<{ $width?: number }>`
  ${({ $width }) => ($width ? `width: ${$width}px;` : '')}
  min-width: 100%;
  border-collapse: collapse;
  box-shadow: 0 7px 20px rgb(0 0 0 / 17%);
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
  text-align: center;
  ${({ columnStyle, theme }) =>
    columnStyle
      ? `
        ${columnStyle.width ? `width: ${columnStyle.width}%;` : ''}
        ${columnStyle.align ? `text-align: ${columnStyle.align};` : ''}
        ${columnStyle.color ? `color: ${theme.color[columnStyle.color]}; font-weight: 700;` : ''}
      `
      : ''}
`;
