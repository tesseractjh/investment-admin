const getQueryObject = (queryString: string) =>
  Object.fromEntries(
    queryString
      .replaceAll('?', '')
      .split('&')
      .map((str) => str.split('='))
  );

export default getQueryObject;
