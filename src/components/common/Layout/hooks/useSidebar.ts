import { useRouter } from 'next/router';
import SIDEBAR_MENU from '../constants/menu';

export default function useSidebar() {
  const { pathname } = useRouter();
  const getIsSelected = (url: string) => url === pathname;
  return { getIsSelected, menus: SIDEBAR_MENU };
}
