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
    deviceSizes: [100, 240, 320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
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
      {
        source: '/portal/og-image/:path*',
        destination: '/_next/image?url=/og-image-source/:path*&w=3840&q=100',
      },
    ];
  },
};

module.exports = nextConfig;
