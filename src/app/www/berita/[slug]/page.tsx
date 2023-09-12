import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Terkait from './_Terkait';
import { apiResourceItemPathRead } from '@/lib/server';
import ContentBlocks from '@/components/content-blocks';
import BaseIcon from '@/components/icons/base-icon';
import Header from './_header';
import NewsShareItem from '@/components/share/item-news';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const getItem = async (slug) => {
  return apiResourceItemPathRead('news')
    .bySlug({ paths: [slug] })
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
    notFound();
  }
  const { title, description } = item;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        `https://www.bolselkab.go.id/og-image/berita/${item.slug}`,
        item.image_cover.url,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@kominfobolsel',
    },
  };
}
export default async function BeritaSlugPage({ params: { slug } }) {
  const item = await getItem(slug);
  if (!item) {
    notFound();
  }
  await apiResourceItemPathRead('news')
    .shareAndViewCount({ paths: [slug, 'view'] })
    .then((res) => {
      item.view_count = res.view_count;
      item.shared_count = res.shared_count;
    });

  return (
    <main>
      <Header item={item} />
      <div className="ui-container mt-12 mb-12 mx-auto">
        <section className="h-full grid grid-cols-1 gap-8 lg:grid-cols-[60%,auto] xl:gap-[72px]">
          <div className="flex flex-col gap-7">
            <article className="article-content w-full">
              {item.content && item.content.blocks && (
                <ContentBlocks {...item.content} />
              )}
            </article>
          </div>
          <section>
            <div className="flex flex-col gap-7 lg:sticky lg:top-[88px]">
              <Terkait item={item} />
              <div className="flex flex-col gap-3 w-full">
                <p className="inline-flex gap-3 font-lato text-xs text-blue-gray-200 leading-5">
                  <BaseIcon
                    icon="share"
                    className="self-start text-primary w-5 h-5"
                  />
                  Bagikan Berita
                </p>
                <NewsShareItem item={item} />
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
