import styled from 'styled-components';
import ListIcon from '@assets/icons/list.svg';
import Sidebar from './Sidebar';
import useHeader from './hooks/useHeader';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const headerName = useHeader();

  return (
    <Container>
      <Sidebar />
      <FlexColumn>
        <Header>
          <ListIcon />
          {headerName}
        </Header>
        <ScrollWrapper>
          <Section>{children}</Section>
          <Footer>Copyright ⓒ December and Company Inc.</Footer>
        </ScrollWrapper>
      </FlexColumn>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  overflow: hidden;
  height: 100vh;
`;

const FlexColumn = styled.div`
  ${({ theme }) => theme.mixin.flexColumn('flex-start', 'stretch')}
  width: 100%;
`;

const Header = styled.header`
  ${({ theme }) => theme.mixin.flex('flex-start')}
  z-index: 10;
  height: 60px;
  padding: 20px 30px;
  background-color: ${({ theme }) => theme.color.WHITE};
  box-shadow: 0 6px 10px rgb(0 0 0 / 17%);
  font-weight: 700;
  font-size: 20px;

  & > svg {
    width: 20px;
    height: 20px;
    margin-right: 20px;
  }
`;

const ScrollWrapper = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  width: calc(100vw - 240px);
  height: calc(100vh - 60px);
`;

const Section = styled.section`
  min-height: calc(100vh - 120px);
  padding: 36px 18px;
`;

const Footer = styled.footer`
  height: 60px;
  font-size: 16px;
  text-align: center;
  line-height: 60px;
  color: ${({ theme }) => theme.color.GRAY};
`;
