import styled from 'styled-components';

type Size = 'small' | 'normal';

type Props = {
  size?: Size;
};

export default function Logo({ size = 'normal' }: Props) {
  return <Container size={size}>D</Container>;
}

const Container = styled.span<{ size?: Size }>`
  ${({ theme }) => theme.mixin.inlineFlex()}
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.LOGO};
  font-weight: 700;
  font-size: 48px;
  color: ${({ theme }) => theme.color.WHITE};
  user-select: none;

  &::after {
    content: '';
    position: absolute;
    bottom: 10px;
    right: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.TERTIARY};
  }

  ${({ size }) =>
    size === 'small'
      ? `
    width: 40px;
    height: 40px;
    border-radius: 6px;
    font-size: 32px;

    &::after {
      bottom: 6px;
      right: 4px;
      width: 6px;
      height: 6px;
    }
  `
      : ''}
`;
