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
  width: 100vw;
  height: 100vh;
`;

const FlexColumn = styled.div`
  ${({ theme }) => theme.mixin.flexColumn('flex-start', 'stretch')}
  width: 100%;
`;

const Header = styled.header`
  ${({ theme }) => theme.mixin.flex('flex-start')}
  height: 60px;
  padding: 20px 30px;
  background-color: ${({ theme }) => theme.color.WHITE};
  font-weight: 700;
  font-size: 20px;

  & > svg {
    width: 20px;
    height: 20px;
    margin-right: 20px;
  }
`;

const ScrollWrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - 60px);
`;

const Section = styled.section`
  min-height: calc(100vh - 120px);
`;

const Footer = styled.footer`
  height: 60px;
  font-size: 16px;
  text-align: center;
  line-height: 60px;
  color: ${({ theme }) => theme.color.GRAY};
`;
