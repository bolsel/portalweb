import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SitePage from '@/components/website/page';
import { dataSiteBySubdomain, dataSiteMenuProfilItems } from '@/lib/data/site';
import { TWebsitePageProps } from '@/types';

export async function generateMetadata({
  params: { subdomain, slug },
}): Promise<Metadata> {
  const site = await dataSiteBySubdomain(subdomain);
  if (!site) notFound();
  const menuList = dataSiteMenuProfilItems(site);
  const menu = menuList?.find((m) => m.link === `/profil/${slug}`);
  if (!menu) notFound();

  return {
    title: `${menu.title} | ${site.name}`,
    description: menu.description,
  };
}

export default async function SiteProfilPage(
  props: TWebsitePageProps<{ slug: string }>
) {
  const { slug, subdomain } = props.params;
  const site = await dataSiteBySubdomain(subdomain);
  if (!site) notFound();

  const menuList = dataSiteMenuProfilItems(site);
  const menu = menuList?.find((m) => m.link === `/profil/${slug}`);
  if (!menu) notFound();

  return (
    <SitePage
      {...props}
      site={site}
      page={{
        ...props,
        name: 'profil/[slug]',
        title: menu.title,
        subTitle: menu.description,
      }}
    />
  );
}
