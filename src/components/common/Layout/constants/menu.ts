import DashboardIcon from '@assets/icons/dashboard.svg';
import ChartIcon from '@assets/icons/chart.svg';
import UserIcon from '@assets/icons/user.svg';
import LogoutIcon from '@assets/icons/logout.svg';
import useLogout from '../hooks/useLogout';

export type Menu = {
  type: 'link' | 'button';
  url: string;
  name: string;
  icon: () => JSX.Element;
  useClick?: () => () => void;
};

const SIDEBAR_MENU: Menu[] = [
  {
    type: 'link',
    url: '/',
    name: '대시보드',
    icon: DashboardIcon,
  },
  {
    type: 'link',
    url: '/accounts',
    name: '투자계좌',
    icon: ChartIcon,
  },
  {
    type: 'link',
    url: '/user',
    name: '사용자',
    icon: UserIcon,
  },
  {
    type: 'button',
    url: '/login',
    name: '로그아웃',
    icon: LogoutIcon,
    useClick: useLogout,
  },
];

export default SIDEBAR_MENU;
