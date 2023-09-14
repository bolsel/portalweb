import { notFound } from 'next/navigation';
import Images from './_Images';
import Info from './_Info';
import Details from './_Details';
import Image from 'next/image';
import { Metadata } from 'next';
import { apiResourceItemRead, titleWithMainTitle } from '@/lib/server';
import BaseIcon from '@/components/icons/base-icon';
import PageWithJumbotron from '@/components/pages/with-jumbotron';
import { urlToPortal, urlToWww } from '@/init';
import JsonLdRender from '@/components/jsonld-render';

const getItem = async (slug) => {
  return await apiResourceItemRead('public_services')
    .setQuery({
      filter: {
        slug: {
          _eq: slug,
        },
      },
    })
    .items({
      single: true,
    })
    .catch(() => null);
};
export async function generateMetadata({
  params: { slug },
}): Promise<Metadata> {
  const item = await getItem(slug);
  if (!item) return notFound();

  return {
    title: titleWithMainTitle(`${item.title} - Layanan Publik`),
    description: item.description,
    openGraph: {
      images: [
        urlToPortal(`/og-image/www/layanan-publik/${item.slug}`),
        item.images[0].url,
      ],
    },
  };
}
export default async function MainLayananPublikSlugPage({ params: { slug } }) {
  const item = await getItem(slug);
  if (!item) return notFound();
  const LogoComponent = ({ item, className }) => (
    <div className={`${className}`}>
      {item.logo ? (
        <Image
          src={item.logo.url}
          alt={`Logo ${item.slug}`}
          width={100}
          height={100}
          className="w-24 h-24"
        />
      ) : (
        <BaseIcon icon="layanan-publik" className="text-primary w-24 h-24" />
      )}
    </div>
  );
  return (
    <PageWithJumbotron
      jumbotron={{
        title: 'Layanan Publik',
        subtitle: 'Informasi layanan publik yang ada di Bolsel',
        breadcrumb: [
          {
            label: 'Beranda',
            link: '/',
          },
          {
            label: 'Layanan Publik',
            link: '/layanan-publik',
          },
        ],
      }}
    >
      <JsonLdRender
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Layanan Publik',
              item: urlToWww('/layanan-publik'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: item.title,
            },
          ],
        }}
      />
      <section className="w-full flex items-center gap-4">
        <LogoComponent item={item} className="" />
        <div className="flex flex-col items-start justify-center gap-1">
          <h1 className="font-bold text-blue-gray-800 text-2xl sm:text-[32px] leading-7 sm:leading-10">
            {item.title}
          </h1>
          <div className="flex flex-row gap-2 items-center">
            <BaseIcon icon="history" className="w-4 h-4" />
            <p className="font-lato text-xs text-blue-gray-800 leading-5">
              Terakhir diupdate {item.date_updated_format}
            </p>
          </div>
        </div>
      </section>
      <section className="mt-6 grid grid-flow-row sm:grid-cols-[auto,262px] lg:grid-cols-2 xl:grid-cols-[816px,auto] gap-4 xl:gap-6">
        <Images data={item} />
        <Info data={item} />
      </section>
      <Details data={item} />
    </PageWithJumbotron>
  );
}
