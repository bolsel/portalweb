import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { apiResourceItemPathRead } from '@/lib/server';
import { dataSiteBeritaBySlug, dataSiteBySubdomain } from '@/lib/data/site';
import { TWebsitePageProps } from '@/types';
import SitePage from '@/components/website/page';
import { dataMetadataNews } from '@/lib/data/metadata';
import JsonLdRender from '@/components/jsonld-render';
import { dataJsonLdNewsArticle } from '@/lib/data/jsonld';

export async function generateMetadata({
  params: { slug },
}): Promise<Metadata> {
  const item = await dataSiteBeritaBySlug(slug);
  if (!item) {
    notFound();
  }
  return dataMetadataNews(item);
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
    <>
      <JsonLdRender data={dataJsonLdNewsArticle({ item })} />
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
    </>
  );
}
