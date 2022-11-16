import { useRouter } from 'next/router';
import SIDEBAR_MENU from '../constants/menu';

export default function useHeader() {
  const { pathname } = useRouter();
  const menu = SIDEBAR_MENU.find(({ url }) => url === pathname);
  if (!menu || pathname === '/login') {
    return '';
  }
  return menu.name;
}
