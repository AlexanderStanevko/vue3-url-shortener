// Utility to simulate URL shortening
export const urlShortener = (url: string): string => {
  const base64Url = btoa(url).slice(0, 8);
  const shortUrl = `https://short.url/${base64Url}`;
  return shortUrl;
};
