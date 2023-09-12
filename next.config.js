const IS_DEV = process.env.NODE_ENV === 'development';
const portalDomain = IS_DEV
  ? `${process.env.NEXT_PUBLIC_SUBDOMAIN_PORTAL}.localhost:${
      process.env.PORT ?? '3000'
    }`
  : `${process.env.NEXT_PUBLIC_SUBDOMAIN_PORTAL}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

const portalUrl = IS_DEV ? `http://${portalDomain}` : `https://${portalDomain}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  assetPrefix: portalUrl,
  images: {
    loader: 'default',
    path: `${portalUrl}/_next/image`,
    remotePatterns: [
      {
        hostname: 'cdn.bolselkab.go.id',
      },
      { hostname: portalDomain },
    ],
  },
  async rewrites() {
    return [
      { source: '/www/berita', destination: '/www/berita/kategori/terbaru' },
    ];
  },
};

module.exports = nextConfig;
