import DashboardIcon from '@assets/icons/dashboard.svg';
import ChartIcon from '@assets/icons/chart.svg';
import UserIcon from '@assets/icons/user.svg';
import LogoutIcon from '@assets/icons/logout.svg';

type Menu = {
  url: string;
  name: string;
  icon: () => JSX.Element;
};

const SIDEBAR_MENU: Menu[] = [
  {
    url: '/',
    name: '대시보드',
    icon: DashboardIcon,
  },
  {
    url: '/accounts',
    name: '투자계좌',
    icon: ChartIcon,
  },
  {
    url: '/user',
    name: '사용자',
    icon: UserIcon,
  },
  {
    url: '/logout',
    name: '로그아웃',
    icon: LogoutIcon,
  },
];

export default SIDEBAR_MENU;
