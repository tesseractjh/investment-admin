import { useRecoilValue } from 'recoil';
import { accountTableSelector } from '@recoil/table';

export default function useAccountQueryState() {
  return useRecoilValue(accountTableSelector);
}
