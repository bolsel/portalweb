export const PATH_SEPARATOR = '/';

export const LOCALDEV_DOMAIN = `localhost:${process.env.PORT ?? '3000'}`;
export const ROOT_DOMAIN =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? 'bolselkab.go.id';
export const SUBDOMAIN_PORTAL =
  process.env.NEXT_PUBLIC_SUBDOMAIN_PORTAL ?? 'portal';

export const DOMAIN_WWW = `www.${ROOT_DOMAIN}`;
export const DOMAIN_PORTAL = `${SUBDOMAIN_PORTAL}.${ROOT_DOMAIN}`;

export const IS_DEV = process.env.NODE_ENV === 'development';

export const URL_PORTAL = IS_DEV
  ? `http://${SUBDOMAIN_PORTAL}.${LOCALDEV_DOMAIN}`
  : `https://${DOMAIN_PORTAL}`;

export const URL_WWW = IS_DEV
  ? `http://www.${LOCALDEV_DOMAIN}`
  : `https://${DOMAIN_WWW}`;

export const urlToPortal = (path?: string) => {
  const url = new URL(URL_PORTAL);
  if (path) url.pathname = path;
  return url.toString();
};
export const urlToPortalProd = (path?: string) => {
  const url = new URL(`https://${DOMAIN_PORTAL}`);
  if (path) url.pathname = path;
  return url.toString();
};

export const urlToWww = (path?: string) => {
  const url = new URL(URL_WWW);
  if (path) url.pathname = path;
  return url.toString();
};

export const urlToApiResource = (path?: string) => {
  const res = '/api/resources';
  return urlToPortal(`${path ? mergePaths(res, path) : res}`);
};

const mergePaths = (a: string, b: string) => {
  if (a.endsWith(PATH_SEPARATOR)) a = a.slice(0, -1);
  if (!b.startsWith(PATH_SEPARATOR)) b = PATH_SEPARATOR + b;
  return a + b;
};
