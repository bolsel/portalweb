import { urlToPortal, urlToWww } from '@/init';
import { TNewsOrWebNewsItemBySlug } from '@/types';
import {
  NewsArticle,
  Organization,
  WebSite,
  WithContext,
  Person,
} from 'schema-dts';
import { dataMetadataNewsOpenGraphImages } from './metadata';

const orgName = 'Pemerintah Kabupaten Bolaang Mongondow Selatan';

export const dataJsonLdOrganization: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: orgName,
  url: urlToWww(),
  image: urlToPortal('logo.png'),
  logo: urlToPortal('logo.png'),
};

export const dataJsonLdWebsite: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: orgName,
  url: urlToWww(),
  image: urlToPortal('logo.png'),
};

export const dataJsonLdNewsArticle = ({
  item,
}: {
  item: TNewsOrWebNewsItemBySlug;
}): WithContext<NewsArticle> => {
  const names = [item.writer];
  const author: Person[] = [
    {
      '@type': 'Person',
      name: item.writer,
      url: urlToWww(),
    },
  ];
  if (!names.find((v) => v === item.reporter)) {
    names.push(item.reporter);
    author.push({
      '@type': 'Person',
      name: item.reporter,
      url: urlToWww(),
    });
  }
  if (item.editor && !names.find((v) => v === item.editor)) {
    author.push({
      '@type': 'Person',
      name: item.editor,
      url: urlToWww(),
    });
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    image: dataMetadataNewsOpenGraphImages(item),
    dateModified: item.date_updated,
    datePublished: new Date(item.publish_date).toISOString(),
    publisher: dataJsonLdOrganization,
    author,
  };
};
