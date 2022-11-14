import styled from 'styled-components';

export default function Logo() {
  return <Container>D</Container>;
}

const Container = styled.span`
  ${({ theme }) => theme.mixin.inlineFlex()}
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.PRIMARY};
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
`;
