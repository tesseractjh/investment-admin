import getQueryObject from './getQueryObject';
import getQueryString from './getQueryString';

const setQueryParams = (params: Record<string, string | number | boolean>) => {
  const prevParams = window.location.search ? getQueryObject(window.location.search) : {};
  const url = `${window.location.pathname}?${getQueryString({ ...prevParams, ...params })}`;
  window.history.replaceState({ ...window.history.state, as: url, url }, '', url);
};

export default setQueryParams;
