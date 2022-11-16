import usePaginationQuery from '@hooks/queries/usePaginationQuery';
import useQueryParams from '@hooks/useQueryParams';

export default function usePagination(tableId: string, defaultLimit: number) {
  const {
    query: { page, limit },
    setQueryParams,
  } = useQueryParams(defaultLimit);
  const data = usePaginationQuery(tableId, page, limit);

  const isPrevDisabled = page === 1;
  const isNextDisabled = !data?.data?.length;

  const handlePrevClick = () => {
    setQueryParams({ page: page > 1 ? page - 1 : 1, limit });
  };

  const handleNextClick = () => {
    setQueryParams({ page: page + 1, limit });
  };

  return { page, isPrevDisabled, isNextDisabled, handlePrevClick, handleNextClick };
}
