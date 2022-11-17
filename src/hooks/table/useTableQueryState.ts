import { useRecoilState } from 'recoil';
import { tableState } from '@recoil/table';

export default function useTableQueryState(tableId: string, query: string) {
  return useRecoilState(tableState([tableId, query]));
}
