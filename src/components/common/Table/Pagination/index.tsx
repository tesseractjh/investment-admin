import styled from 'styled-components';
import ChevronIcon from '@assets/icons/chevron.svg';
import usePagination from '../hooks/usePagination';

type Props = {
  tableId: string;
};

export default function Pagination({ tableId }: Props) {
  const { page, isPrevDisabled, isNextDisabled, handlePrevClick, handleNextClick } = usePagination(tableId);

  return (
    <Container>
      <Button type="button" disabled={isPrevDisabled} onClick={handlePrevClick}>
        <ChevronIcon />
      </Button>
      {`${page} 페이지`}
      <Button type="button" disabled={isNextDisabled} onClick={handleNextClick} isRotated>
        <ChevronIcon />
      </Button>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.mixin.flex('space-between', 'center')}
  width: 160px;
`;

const Button = styled.button<{ isRotated?: boolean; disabled: boolean }>`
  ${({ theme }) => theme.mixin.inlineFlex()}
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.WHITE};
  ${({ disabled, theme }) =>
    disabled
      ? `
        cursor: not-allowed;

        & > svg {
          fill: ${theme.color.BORDER}
        }
        `
      : ''}

  &:hover {
    background-color: ${({ theme }) => theme.color.BACKGROUND};
  }

  & > svg {
    width: 18px;
    height: 18px;
    ${({ isRotated }) => (isRotated ? 'transform: rotate(180deg);' : '')}
  }
`;
