import Table from '@components/common/Table';
import useAccounts from '@hooks/useAccounts';

const columnStyles: React.ComponentProps<typeof Table>['columnStyles'] = [
  { width: 9, color: 'SECONDARY' },
  { width: 9 },
  { width: 12, align: 'right', color: 'SECONDARY' },
  { width: 9 },
  { width: 10 },
  { width: 10, align: 'right' },
  { width: 10, align: 'right' },
  { width: 9 },
  { width: 12 },
];

export default function Accounts() {
  const { data, columns, isReady } = useAccounts();

  if (!isReady || !columns || !data) {
    return null;
  }

  return (
    <>
      <Table columns={columns} data={data} width={1600} columnStyles={columnStyles} />
    </>
  );
}
