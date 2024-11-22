import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { dataSiteBySubdomain, dataSitePageBySlug } from '@/lib/data/site';
import { TWebsitePageProps } from '@/types';
import SitePage from '@/components/website/page';

export async function generateMetadata(
  props: TWebsitePageProps<{ slug: string }>
): Promise<Metadata> {
  const {
    params: { subdomain, slug },
  } = props;
  const site = await dataSiteBySubdomain(subdomain);
  if (!site) notFound();
  const item = await dataSitePageBySlug(site.id, slug);
  if (!item) notFound();

  return {
    title: item.title,
    description: item.description ?? site.name,
  };
}
export default async function Page(props: TWebsitePageProps<{ slug: string }>) {
  const {
    params: { subdomain, slug },
  } = props;
  const site = await dataSiteBySubdomain(subdomain);
  if (!site) notFound();
  const item = await dataSitePageBySlug(site.id, slug);
  if (!item) notFound();

  return (
    <>
      <SitePage
        site={site}
        data={{ item }}
        page={{
          ...props,
          name: 'page/[slug]',
          title: item.title,
          subTitle: item.description ?? '',
        }}
      />
    </>
  );
}
