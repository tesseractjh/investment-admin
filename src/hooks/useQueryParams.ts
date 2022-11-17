import getQueryObject from '@utils/getQueryObject';
import getQueryString from '@utils/getQueryString';

export default function useQueryParams() {
  const setQueryParams = (params: Record<string, string | number>) => {
    const prevParams = window.location.search ? getQueryObject(window.location.search) : {};
    const url = `${window.location.pathname}?${getQueryString({ ...prevParams, ...params })}`;
    window.history.replaceState({ ...window.history.state, as: url, url }, '', url);
    // history로 단순 url 변경하고 (새로고침 대비용)
    // 그리고 실제 데이터는 recoil로 관리하기!
    // tableState에 tableId와 query명 2개를 parameter로 받도록 atomFamily만들고
    // selectorFramily에서 tableId를 parameter로 받아서 하나의 객체로 합치기
    // 이 selector를 useQuery의 queryKey param으로 쓰기
  };

  return setQueryParams;
}
