import usePaginationQuery from '@hooks/queries/usePaginationQuery';
import { useTableQueryState, useAccountQueryState } from '@hooks/table';

export default function usePagination(tableId: string) {
  const [page, setPage] = useTableQueryState(tableId, 'page');
  const accountsQueryState = useAccountQueryState();
  const data = usePaginationQuery(tableId, accountsQueryState);

  const isPrevDisabled = page === '1';
  const isNextDisabled = !data?.data?.length;

  const handlePrevClick = () => {
    const nextPageValue = Number(page) > 1 ? String(Number(page) - 1) : '1';
    setPage(nextPageValue);
  };

  const handleNextClick = () => {
    const nextPageValue = String(Number(page) + 1);
    setPage(nextPageValue);
  };

  return { page, isPrevDisabled, isNextDisabled, handlePrevClick, handleNextClick };
}
