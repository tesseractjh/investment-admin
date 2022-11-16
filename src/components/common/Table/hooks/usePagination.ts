import { useRecoilState } from 'recoil';
import { tablePageState } from '@recoil/table';
import usePaginationQuery from '@hooks/queries/usePaginationQuery';

export default function usePagination(tableId: string, limit: number) {
  const [page, setPage] = useRecoilState(tablePageState(tableId));
  const data = usePaginationQuery(tableId, page, limit);

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
