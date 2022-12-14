import type { GetServerSideProps } from 'next';
import API, { ResponseData, serverAPI } from '@api/index';
import type { AccountResponse } from '@api/services/account';
import Table from '@components/common/Table';
import useAccounts from '@hooks/useAccounts';

type Props = {
  initialData: [ResponseData<AccountResponse[]>, ResponseData<AccountResponse[]>];
  initialQuery: Record<string, string>;
};

const DEFAULT_LIMIT = '20';

const columnStyles: React.ComponentProps<typeof Table>['columnStyles'] = [
  { width: 11, color: 'SECONDARY' },
  { width: 10 },
  { width: 13, color: 'SECONDARY' },
  { width: 9 },
  { width: 13 },
  { width: 11 },
  { width: 11 },
  { width: 9 },
  { width: 13 },
];

export default function Accounts({ initialData, initialQuery }: Props) {
  const { data, dataConverter, filters, columns, isReady } = useAccounts(initialData, initialQuery);

  if (!isReady) {
    return null;
  }

  return (
    <Table
      tableId="accounts"
      columns={columns}
      data={data}
      dataConverter={dataConverter}
      filters={filters}
      limit={DEFAULT_LIMIT}
      minWidth={1500}
      maxWidth={2000}
      columnStyles={columnStyles}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken } = ctx.req.cookies;
  const { page = '1', limit = DEFAULT_LIMIT, ...restQuery } = ctx.query;

  serverAPI.interceptors.request.use((config) => {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  const results = await Promise.all([
    API.account.getAccounts({ page: String(page), limit: String(limit), ...restQuery }),
    API.account.getAccounts({ page: String(Number(page) + 1), limit: String(limit), ...restQuery }),
  ]);

  if (results.some(({ error }) => error?.status === 401)) {
    ctx.res.setHeader('Set-Cookie', 'accessToken=; max-age=0');
    return {
      redirect: {
        destination: '/login?expired=true',
      },
      props: {},
    };
  }

  return {
    props: {
      initialData: results.map(({ data }) => ({ data })),
      initialQuery: { page: String(page), limit: String(limit), ...restQuery },
    },
  };
};
