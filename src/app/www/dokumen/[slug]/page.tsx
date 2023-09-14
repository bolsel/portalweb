import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { apiResourceItemRead } from '@/lib/server';
import UIDocumentItemDetail from '@/ui/dokumen/item-detail';
import PageWithJumbotron from '@/components/pages/with-jumbotron';
import UIDocumentItemFrame from '@/ui/dokumen/item-frame';
import JsonLdRender from '@/components/jsonld-render';
import { urlToWww } from '@/init';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const getItem = async (slug) => {
  return await apiResourceItemRead('documents')
    .setQuery({
      filter: {
        slug: { _eq: slug },
      },
    })
    .items({
      single: true,
    })
    .catch(() => null);
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const item = await getItem(slug);
  if (!item) {
    return notFound();
  }
  return {
    title: item.title,
    description: item.description,
  };
}

export default async function MainDokumenSlugPage({ params: { slug } }) {
  const item = await getItem(slug);
  if (!item) {
    return notFound();
  }
  return (
    <PageWithJumbotron
      jumbotron={{
        title: item.title,
        subtitle: item.category.name,
        breadcrumb: [
          {
            label: 'Beranda',
            link: '/',
          },
          {
            label: 'Dokumen',
            link: '/dokumen',
            active: true,
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
              name: 'Dokumen',
              item: urlToWww('/dokumen'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: item.category.name,
              item: `${urlToWww('/dokumen')}?kategori=${item.category.slug}`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: item.title,
            },
          ],
        }}
      />
      <div className="p-3 md:p-4 lg:py-8 lg:px-10 rounded-xl bg-white w-full xl:grid xl:grid-cols-[1fr,360px] xl:grid-rows-[auto,1fr] lg:gap-6">
        <UIDocumentItemFrame item={item} />

        <div className="">
          <div className="flex flex-col gap-7 lg:sticky lg:top-[88px]">
            <UIDocumentItemDetail
              item={item}
              customizes={{
                descriptionScroll: () => false,
                showDownloadLink: () => true,
              }}
            />
          </div>
        </div>
      </div>
    </PageWithJumbotron>
  );
}
