import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { TWebsiteGenMetaProps, TWebsitePageProps } from '@/types';
import { dataSiteBySubdomain } from '@/lib/data/site';
import Lists from './_components/lists';
import SitePage from '@/components/website/page';

export async function generateMetadata({
  params: { subdomain },
}: TWebsiteGenMetaProps): Promise<Metadata> {
  const site = await dataSiteBySubdomain(subdomain);
  if (!site) notFound();

  return {
    title: `Berita | ${site.name}`,
    description: `Berita ${site.organization.name}`,
  };
}

export default async function Page(props: TWebsitePageProps) {
  return (
    <SitePage
      page={{
        ...props,
        name: 'berita',
        title: 'Berita',
        subTitle: 'Berita {{site.organization.name}}',
      }}
    />
  );
}
