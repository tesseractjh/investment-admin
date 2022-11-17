import { selector } from 'recoil';
import { tableState } from './atoms';

const accountParams = ['page', 'limit', 'broker_id', 'status', 'is_active'];

export const accountTableSelector = selector<Record<string, string>>({
  key: 'accountTableSelector',
  get: ({ get }) =>
    accountParams
      .map((query) => [query, get(tableState(['accounts', query]))])
      .filter(([, state]) => state)
      .reduce<Record<string, string>>((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {}),
});
