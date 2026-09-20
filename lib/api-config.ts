/**
 * Resolves the base API URL for client-side and server-side requests.
 * Reads `NEXT_PUBLIC_API_URL` if set (for standalone backend hosting),
 * otherwise defaults to an empty string (relative to current origin).
 */
export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) return "";
  // Strip trailing slash if present
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function buildApiUrl(path: string): string {
  const base = getApiBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
