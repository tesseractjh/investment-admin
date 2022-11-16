import styled from 'styled-components';
import Logo from '../../Logo';
import useSidebar from '../hooks/useSidebar';
import MenuItem from './MenuItem';

export default function Sidebar() {
  const { getIsSelected, menus } = useSidebar();

  return (
    <Container>
      <LogoWrapper>
        <Logo size="small" />
        <LogoText>PREFACE</LogoText>
      </LogoWrapper>
      <List>
        {menus.map((menu) => (
          <MenuItem key={menu.name} menu={menu} isSelected={getIsSelected(menu.url)} />
        ))}
      </List>
    </Container>
  );
}

const Container = styled.nav`
  flex-shrink: 0;
  width: 240px;
  padding: 16px 0;
  background-color: ${({ theme }) => theme.color.PRIMARY};
`;

const LogoWrapper = styled.header`
  padding: 0 24px;
  margin-bottom: 20px;

  & .logo {
    width: 40px;
    height: 40px;
  }
`;

const LogoText = styled.strong`
  margin-left: 10px;
  font-weight: 700;
  font-size: 30px;
  color: ${({ theme }) => theme.color.WHITE};
`;

const List = styled.ul``;
