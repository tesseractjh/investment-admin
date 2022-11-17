import usePaginationQuery from '@hooks/queries/usePaginationQuery';
import { useTableQueryState, useTableQueryValue } from '@hooks/table';
import useQueryParams from '@hooks/useQueryParams';

export default function usePagination(tableId: string) {
  const [page, setPage] = useTableQueryState(tableId, 'page');
  const limit = useTableQueryValue(tableId, 'limit');
  const setQueryParams = useQueryParams();
  const data = usePaginationQuery(tableId, page, limit);

  const isPrevDisabled = page === 1;
  const isNextDisabled = !data?.data?.length;

  const handlePrevClick = () => {
    const nextPageValue = page > 1 ? page - 1 : 1;
    setPage(nextPageValue);
    setQueryParams({ page: nextPageValue, limit });
  };

  const handleNextClick = () => {
    const nextPageValue = page + 1;
    setPage(nextPageValue);
    setQueryParams({ page: nextPageValue, limit });
  };

  return { page, isPrevDisabled, isNextDisabled, handlePrevClick, handleNextClick };
}
