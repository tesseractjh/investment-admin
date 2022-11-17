import styled from 'styled-components';
import UserIcon from '@assets/icons/user.svg';
import Logo from '@components/common/Logo';
import LoginForm from '@components/Login/LoginForm';
import useAuth from '@hooks/useAuth';

export default function LoginPage() {
  const isAuthorized = useAuth();

  if (isAuthorized) {
    return null;
  }

  return (
    <Container>
      <Header>
        <Logo />
        <LogoText>PREFACE</LogoText>
      </Header>
      <Main>
        <FormHeader>
          <UserIcon />
          로그인
        </FormHeader>
        <LoginForm />
      </Main>
      <Footer>ⓒ December and Company</Footer>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.mixin.flexColumn()}
  width: 100vw;
  height: 100vh;
`;

const Header = styled.header`
  margin-bottom: 60px;
`;

const LogoText = styled.strong`
  margin-left: 30px;
  font-weight: 900;
  font-size: 48px;
  color: ${({ theme }) => theme.color.PRIMARY};
`;

const Main = styled.main`
  width: 400px;
  box-shadow: 0 7px 20px rgb(0 0 0 / 17%);
`;

const FormHeader = styled.div`
  ${({ theme }) => theme.mixin.flex('flex-start')}
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.color.BACKGROUND};
  background-color: ${({ theme }) => theme.color.GRAY_LIGHT};

  & > svg {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
`;

const Footer = styled.footer`
  margin-top: 20px;
  color: ${({ theme }) => theme.color.GRAY};
`;
