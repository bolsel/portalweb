import { apiResourceItems } from '@/lib/server';
import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';
export const revalidate = 1000;
const sendError = (message: any) => {
  return NextResponse.json(
    {
      error: 1,
      message,
    },
    { status: 500 }
  );
};

export async function GET(
  request: NextRequest,
  { params }: { params: { q: string[] } }
) {
  const [resourceKey, path, ...pathQuery] = params.q;
  try {
    const _apiResource = apiResourceItems[resourceKey];
    if (!_apiResource) {
      throw new Error(`Api resource tidak ada: ${resourceKey}`);
    }
    if (!_apiResource.paths.read[path]) {
      throw new Error(`Api Resource path tidak ada: ${resourceKey}/${path}`);
    }
    const query = qs.parse(Object.fromEntries(request.nextUrl.searchParams));
    if (query.limit) query.limit = parseInt(query.limit as string);
    if (query.page) query.page = parseInt(query.page as string);
    query.paths = pathQuery ?? [];
    const data = await _apiResource.paths.read[path](query);
    return NextResponse.json(data);
  } catch (e: any) {
    if (process.env.NODE_ENV === 'development') {
      if (e && e['errors']) return sendError(e['errors']);
      else if (e && e['message']) return sendError(e['message']);
    } else {
      return sendError('Terjadi kesalahan');
    }
  }
}
