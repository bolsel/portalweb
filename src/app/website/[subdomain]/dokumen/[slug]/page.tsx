import SitePage from '@/components/website/page';
import { urlToPortal } from '@/init';
import { dataSiteBySubdomain } from '@/lib/data/site';
import { apiResourceItemRead } from '@/lib/server';
import { TWebsitePageProps } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const kategoryText = (category: string) => {
  if (category === 'dokumen-perencanaan') return 'Dokumen Perencanaan';
  else if (category === 'laporan-keuangan') return 'Dokumen Laporan Keuangan';
  else if (category === 'lainnya') return 'Dokumen Lainnya';
  else return category;
};

const getItem = async (slug) => {
  return await apiResourceItemRead('organization_documents')
    .setQuery({
      filter: { slug: { _eq: slug } },
    })
    .items({ single: true })
    .catch(() => null);
};

export async function generateMetadata({
  params: { subdomain, slug },
}: TWebsitePageProps<{ slug: string }>): Promise<Metadata> {
  const site = await dataSiteBySubdomain(subdomain);
  if (!site) notFound();

  const item = await getItem(slug);
  if (!item) notFound();

  return {
    title: `${item.title} | ${site.name}`,
    description: `(${kategoryText(item.category)}) ${site.organization.name}`,
    openGraph: {
      images: [
        urlToPortal(`/og-image/${site.subdomain}/dokumen/${item.slug}`),
        urlToPortal('/images/dokumen-file-icon.webp'),
      ],
    },
  };
}

export default async function Page(props: TWebsitePageProps<{ slug: string }>) {
  const {
    params: { slug },
  } = props;

  const item = await getItem(slug);
  if (!item) notFound();

  return (
    <SitePage
      data={{ item }}
      page={{
        ...props,
        name: 'dokumen/[slug]',
        title: item.title,
        subTitle: kategoryText(item.category),
      }}
    />
  );
}
