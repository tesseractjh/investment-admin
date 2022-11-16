import { atomFamily } from 'recoil';

export const tablePageState = atomFamily<number, string>({
  key: 'tablePageState',
  default: 1,
});
