import { ACCOUNTS_COLUMNS, ACCOUNT_STATE } from '@constants/accounts';
import getFormattedAccount from '@utils/getFormattedAccount';
import getFormattedValue from '@utils/getFormattedValue';
import getFormattedDate from '@utils/getFormattedDate';
import { BROKERS, BROKER_FORMAT } from '@constants/brokers';
import type { ResponseData } from '@api/index';
import type { AccountResponse } from '@api/services/account';
import useAccountsQueries from './queries/useAccountsQueries';

const dataConverter = (accounts: AccountResponse[]) =>
  accounts.map((account) => {
    const row: Record<keyof typeof ACCOUNTS_COLUMNS, string | number> = { ...ACCOUNTS_COLUMNS };
    row.user_name = account.user.name;
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

export default function useAccounts(
  initialData: [ResponseData<AccountResponse[]>, ResponseData<AccountResponse[]>],
  initialQuery: { page: number; limit: number }
) {
  const results = useAccountsQueries(initialData, initialQuery);

  const defaultValues: {
    data: AccountResponse[];
    dataConverter: (data: AccountResponse[]) => Record<string, string | number>[];
    columns: typeof ACCOUNTS_COLUMNS;
    isReady: boolean;
  } = { data: [], dataConverter, columns: ACCOUNTS_COLUMNS, isReady: false };

  if (results.some((result) => !result)) {
    return defaultValues;
  }

  const isLoading = results.some(({ isLoading }) => isLoading);
  const hasError = results.some(({ data }) => data?.error);
  const [{ data: accountsData }] = results;

  if (!accountsData) {
    return defaultValues;
  }

  const { data = [] } = accountsData;

  return {
    data,
    dataConverter,
    columns: ACCOUNTS_COLUMNS,
    isReady: !isLoading && !hasError,
  };
}
