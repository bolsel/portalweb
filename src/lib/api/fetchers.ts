export async function fetcherNoStoreCache<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const response = await fetch(input, { ...init, cache: 'no-store' });
  return response.json();
}
export async function fetcherBase<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const response = await fetch(input, { ...init });
  return response.json();
}
