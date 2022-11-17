import { useRecoilValue } from 'recoil';
import { tableState } from '@recoil/table';

export default function useTableQueryValue(tableId: string, query: string) {
  return useRecoilValue(tableState([tableId, query]));
}
