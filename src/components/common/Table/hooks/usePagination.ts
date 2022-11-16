import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { tablePageState } from '@recoil/table';
import API from '@api/index';

export default function usePagination(tableId: string, limit: number) {
  const [page, setPage] = useRecoilState(tablePageState(tableId));
  const { data } = useQuery([tableId, { page: page + 1, limit }], () => API.account.getAccounts(page + 1, limit));

  const isPrevDisabled = page === 1;
  const isNextDisabled = !data?.data.length;

  const handlePrevClick = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleNextClick = () => {
    setPage((prev) => prev + 1);
  };

  return { page, isPrevDisabled, isNextDisabled, handlePrevClick, handleNextClick };
}
