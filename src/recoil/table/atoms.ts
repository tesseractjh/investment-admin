import setQueryParams from '@utils/setQueryParams';
import { atomFamily } from 'recoil';

export const tableState = atomFamily<string, [string, string]>({
  key: 'tableState',
  default: ([, query]) => {
    switch (query) {
      case 'page':
        return '1';
      case 'limit':
        return '20';
      default:
        return '';
    }
  },
  effects: ([, param]) => [
    ({ onSet }) =>
      onSet((value) => {
        setQueryParams({ [param]: value });
      }),
  ],
});
