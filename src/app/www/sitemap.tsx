import { urlToWww } from '@/init';
import { apiResourceItemRead } from '@/lib/server';

export default async function Sitemap() {
  const berita = await apiResourceItemRead('news')
    .setQuery({
      limit: -1,
    })
    .items({
      normalizer: [['slug'], (data) => data],
    });
  const beritaUrls = berita
    ? berita.map(({ slug }) => ({
        url: urlToWww(`/berita/${slug}`),
        lastModified: new Date(),
      }))
    : undefined;
  return [
    {
      url: urlToWww(),
      lastModified: new Date(),
    },
    ...(beritaUrls ?? []),
  ];
}
