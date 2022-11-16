export const setCookie = (key: string, value: string | number, maxAge?: number) => {
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; max-age=${maxAge ?? 3600};`;
};

export const deleteCookie = (key: string) => {
  document.cookie = `${encodeURIComponent(key)}=; max-age=0`;
};

export const getCookie = (key: string) => {
  const cookie = Object.fromEntries(document.cookie.split(';').map((v) => v.trim().split('=')));
  return cookie[key];
};
