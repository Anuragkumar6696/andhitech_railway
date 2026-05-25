export const getAbsoluteURL = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const API = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/api\/v1\/?$/, '').replace(/\/+$/, '');
  return `${API}${url.startsWith('/') ? '' : '/'}${url}`;
};
