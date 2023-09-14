import { urlToApiResource, urlToSite, urlToWww } from '@/init';
import {
  TApiResourcePathReturn,
  TNewsOrWebNewsItemBySlug,
  TWebNewsItemBySlug,
} from '@/types';

export const newsItemIsWeb = (item: TNewsOrWebNewsItemBySlug) =>
  (item as TWebNewsItemBySlug).website ? (item as TWebNewsItemBySlug) : false;

export const urlBeritaByItem = (item: TNewsOrWebNewsItemBySlug) => {
  const path = `/berita/${item.slug}`;

  const isWeb = newsItemIsWeb(item) ? (item as TWebNewsItemBySlug) : undefined;
  return isWeb ? urlToSite(isWeb.website.subdomain, path) : urlToWww(path);
};

export function titleWithMainTitle(title: string) {
  if (!process.env.NEXT_PUBLIC_MAIN_TITLE) return title;
  return `${title} | ${process.env.NEXT_PUBLIC_MAIN_TITLE}`;
}
export async function fetchNewsShareCount(item: TNewsOrWebNewsItemBySlug) {
  const url = `${newsItemIsWeb(item) ? 'web_news' : 'news'}/shareAndViewCount/${
    item.slug
  }/share`;
  return fetch(urlToApiResource(url));
}
