import { NextRequest, NextResponse } from 'next/server';
import {
  LOCALDEV_DOMAIN,
  DOMAIN_PORTAL,
  ROOT_DOMAIN,
  DOMAIN_WWW,
} from './init';

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const hostname = req.headers
    .get('host')
    ?.replace(`.${LOCALDEV_DOMAIN}`, `.${ROOT_DOMAIN}`);
  const subdomain = req.headers
    .get('host')
    ?.replace(`.${LOCALDEV_DOMAIN}`, '')
    ?.replace(`.${ROOT_DOMAIN}`, '');
  const path = url.pathname;

  if (
    path.match(
      '/((og-image/|_next/|images|_static/|_vercel|[\\w-]+\\.\\w+).*)'
    ) &&
    !path.match('sitemap.xml')
  ) {
    if (hostname !== DOMAIN_PORTAL) {
      return NextResponse.json(
        { error: 1, status: 404, message: 'Not found' },
        { status: 404 }
      );
    }
    return NextResponse.next({
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  if (hostname === DOMAIN_PORTAL) {
    return NextResponse.rewrite(new URL(`/portal${path}`, req.url), {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  if (hostname === ROOT_DOMAIN || hostname === DOMAIN_WWW) {
    // rewrite ke www site
    return NextResponse.rewrite(new URL(`/www${path}`, req.url));
  }
  return NextResponse.rewrite(new URL(`/website/${subdomain}${path}`, req.url));
}
