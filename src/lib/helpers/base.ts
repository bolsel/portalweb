import { urlToApiResource } from '@/init';
import { TApiResourcePathReturn, TNewsOrWebNewsItemBySlug } from '@/types';

export const newsItemIsWeb = (item: TNewsOrWebNewsItemBySlug) =>
  (item as TApiResourcePathReturn<'web_news'>['read']['bySlug']).website
    ? true
    : false;

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
