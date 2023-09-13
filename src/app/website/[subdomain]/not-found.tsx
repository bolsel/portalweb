import { TWebsitePageProps } from '@/types';
import SitePage from '@/components/website/page';
import { Metadata } from 'next';
import { currentReqSubdomain } from '@/lib/server';

export const metadata: Metadata = {
  title: 'Halaman tidak ditemukan',
};

export default function NotFound(props: TWebsitePageProps) {
  const subdomain = currentReqSubdomain();
  if (!subdomain) {
    return <div>Halaman tidak ditemukan.</div>;
  }
  return (
    <SitePage
      page={{
        params: { subdomain },
        searchParams: {},
        name: 'not-found',
        title: 'Halaman tidak ditemukan',
        subTitle: '{{site.name}}',
      }}
    />
  );
}
