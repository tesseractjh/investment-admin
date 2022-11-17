import { atomFamily } from 'recoil';

export const tableState = atomFamily<number, [string, string]>({
  key: 'tableState',
  default: ([, query]) => {
    switch (query) {
      case 'page':
        return 1;
      case 'limit':
        return 20;
      default:
        return 0;
    }
  },
});
