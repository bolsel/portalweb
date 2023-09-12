import SitePage from '@/components/website/page';
import { dataSiteBySubdomain } from '@/lib/data/site';
import { TWebsitePageProps } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params: { subdomain },
}: TWebsitePageProps): Promise<Metadata> {
  const site = await dataSiteBySubdomain(subdomain);
  if (!site) notFound();

  return {
    title: `Dokumen | ${site.name}`,
    description: `Lihat dokuman publik pada ${site.organization.name}`,
  };
}

export default function Page(props: TWebsitePageProps) {
  return (
    <SitePage
      page={{
        ...props,
        name: 'dokumen',
        title: 'Dokumen',
        subTitle: 'Dokumen Publik {{site.organization.name}}',
      }}
    />
  );
}
