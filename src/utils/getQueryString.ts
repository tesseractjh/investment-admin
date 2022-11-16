const getQueryString = (query: Record<string, unknown>, converter?: (key: string) => string) =>
  Object.entries(query)
    .map(([key, value]) => `${converter ? converter(key) : key}=${value}`)
    .join('&');

export default getQueryString;
