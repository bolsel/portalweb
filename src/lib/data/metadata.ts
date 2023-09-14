import { urlToPortal } from '@/init';
import { TNewsOrWebNewsItemBySlug, TWebNewsItemBySlug } from '@/types';
import { newsItemIsWeb, urlBeritaByItem } from '../server';
import { Metadata } from 'next';

export function dataMetadataNewsOpenGraphImages(
  item: TNewsOrWebNewsItemBySlug
): string[] {
  const isWeb = newsItemIsWeb(item);
  return [
    urlToPortal(
      `/og-image/${isWeb ? isWeb.website.subdomain : 'www'}/berita/${item.slug}`
    ),
    item.image_cover.url,
  ];
}

export function dataMetadataNewsOpenGraph(
  item: TNewsOrWebNewsItemBySlug
): Metadata['openGraph'] {
  return {
    url: urlBeritaByItem(item),
    title: item.title,
    description: item.description,
    images: dataMetadataNewsOpenGraphImages(item),
  };
}

export function dataMetadataNews(item: TNewsOrWebNewsItemBySlug): Metadata {
  const { title, description } = item;
  return {
    title,
    description,
    openGraph: dataMetadataNewsOpenGraph(item),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@kominfobolsel',
    },
  };
}
