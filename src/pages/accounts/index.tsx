import Table from '@components/common/Table';
import useAccounts from '@hooks/useAccounts';

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

const TABLE_LIMIT = 20;

export default function Accounts() {
  const { data, columns, isReady } = useAccounts(TABLE_LIMIT);

  if (!isReady) {
    return null;
  }

  return (
    <Table
      tableId="accounts"
      columns={columns}
      data={data}
      limit={TABLE_LIMIT}
      minWidth={1500}
      maxWidth={2000}
      columnStyles={columnStyles}
    />
  );
}
