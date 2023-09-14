import { dataSiteBySubdomain } from '@/lib/data/site';
import { apiResourceItemRead, currentReqSubdomain } from '@/lib/server';
import { notFound } from 'next/navigation';

export default async function Sitemap() {
  const subdomain = currentReqSubdomain();
  if (!subdomain) notFound();
  const site = await dataSiteBySubdomain(subdomain);
  if (!site) notFound();

  const berita = await apiResourceItemRead('web_news')
    .setQuery({
      filter: { website: { _eq: site.id } },
      limit: -1,
    })
    .items({
      normalizer: [['slug'], (data) => data],
    });
  const beritaUrls = berita
    ? berita.map(({ slug }) => ({
        url: `https://${site.domain}/berita/${slug}`,
        lastModified: new Date(),
      }))
    : undefined;
  return [
    {
      url: `https://${site.domain}`,
      lastModified: new Date(),
    },
    ...(beritaUrls ?? []),
  ];
}
