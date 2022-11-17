import { useSetRecoilState } from 'recoil';
import { tableState } from '@recoil/table';

export default function useSetTableQuery(tableId: string, query: string) {
  return useSetRecoilState(tableState([tableId, query]));
}
