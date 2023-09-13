import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { apiResourceItemPathRead } from '@/lib/server';
import { dataSiteBeritaBySlug, dataSiteBySubdomain } from '@/lib/data/site';
import { TWebsitePageProps } from '@/types';
import SitePage from '@/components/website/page';
import { urlToPortal } from '@/init';

export async function generateMetadata({
  params: { subdomain, slug },
}): Promise<Metadata> {
  const item = await dataSiteBeritaBySlug(slug);
  if (!item) {
    notFound();
  }
  const { title, description } = item;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        urlToPortal(`/og-image/${subdomain}/berita/${item.slug}`),
        item.image_cover.url,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@kominfobolsel',
    },
  };
}
export default async function Page(props: TWebsitePageProps<{ slug: string }>) {
  const {
    params: { subdomain, slug },
  } = props;
  const site = await dataSiteBySubdomain(subdomain);
  if (!site) notFound();
  const item = await dataSiteBeritaBySlug(slug);
  if (!item) notFound();

  await apiResourceItemPathRead('web_news')
    .shareAndViewCount({ paths: [slug, 'view'] })
    .then((res) => {
      item.view_count = res.view_count;
      item.shared_count = res.shared_count;
    });

  return (
    <SitePage
      site={site}
      data={{ item }}
      page={{
        ...props,
        name: 'berita/[slug]',
        title: item.title,
        subTitle: 'Berita {{site.name}}',
      }}
    />
  );
}
