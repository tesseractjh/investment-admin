import { useQueries } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import API from '@api/index';
import { ACCOUNTS_COLUMNS, ACCOUNT_STATE } from '@constants/accounts';
import getFormattedAccount from '@utils/getFormattedAccount';
import getFormattedValue from '@utils/getFormattedValue';
import getFormattedDate from '@utils/getFormattedDate';
import { BROKERS, BROKER_FORMAT } from '@constants/brokers';
import { tablePageState } from '@recoil/table';

const accountsQuery = (page: number, limit: number) => ({
  queryKey: ['accounts', { page, limit }],
  queryFn: () => API.account.getAccounts(page, limit),
  staleTime: 3 * 60 * 1000,
  keepPreviousData: true,
});

const usersQuery = {
  queryKey: ['users'],
  queryFn: API.user.getUsers,
  staleTime: 3 * 60 * 1000,
};

export default function useAccounts(limit: number) {
  const page = useRecoilValue(tablePageState('accounts'));
  const results = useQueries({
    queries: [accountsQuery(page, limit), usersQuery, accountsQuery(page + 1, limit)],
  });
  const defaultValues = { data: [], columns: ACCOUNTS_COLUMNS, isReady: false };

  if (results.some((result) => !result)) {
    return defaultValues;
  }

  const isLoading = results.some(({ isLoading }) => isLoading);
  const hasError = results.some(({ data }) => data?.error);
  const [{ data: accountsData }, { data: usersData }] = results;

  if (!accountsData || !usersData) {
    return defaultValues;
  }

  const { data: accounts = [] } = accountsData;
  const { data: users = [] } = usersData;

  const data = accounts.map((account) => {
    const row: Record<keyof typeof ACCOUNTS_COLUMNS, string | number> = { ...ACCOUNTS_COLUMNS };
    row.user_name = users.find(({ id }) => id === account.user_id)?.name ?? '';
    row.broker_name = BROKERS[account.broker_id];
    row.number = getFormattedAccount(account.number, BROKER_FORMAT[account.broker_id]);
    row.status = ACCOUNT_STATE[account.status];
    row.name = account.name;
    row.assets = getFormattedValue(account.assets);
    row.payments = getFormattedValue(account.payments);
    row.is_active = account.is_active ? '활성' : '비활성';
    row.created_at = getFormattedDate(account.created_at);
    return row;
  });

  return {
    data,
    columns: ACCOUNTS_COLUMNS,
    isReady: !isLoading && !hasError,
  };
}
