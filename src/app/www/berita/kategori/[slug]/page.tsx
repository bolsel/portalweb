import {
  apiResourceItem,
  apiResourceItemRead,
  titleWithMainTitle,
} from '@/lib/server';
import CategorySwiper from './_components/category-swiper';
import PopulerSide from './_components/popular-side';
import HeadlineCarousel from './_components/headline-carousel';
import Lists from './_components/lists';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const revalidate = 86400;

export async function generateMetadata({
  params: { slug },
}): Promise<Metadata> {
  const category = await apiResourceItemRead('news_categories')
    .setQuery({
      filter: { slug: { _eq: slug } },
    })
    .items({
      normalizer: [['name', 'description'], (data) => data],
      single: true,
    })
    .catch(() => null);
  if (!category && slug !== 'terbaru') notFound();
  if (category) {
    return {
      title: titleWithMainTitle(`Berita ${category.name}`),
      description: `Berita ${category.name} | ${category.description}`,
    };
  }
  return {
    title: titleWithMainTitle(`Berita Terbaru`),
    description: titleWithMainTitle(`Cari tahu berita terbaru`),
  };
}

export default async function Page({ params: { slug } }) {
  const headlineData = await apiResourceItem('news').paths.read.items({
    limit: 4,
    filter:
      slug !== 'terbaru' ? { category: { slug: { _eq: slug } } } : undefined,
  });
  if (!headlineData.length) notFound();
  const categories = await apiResourceItem('news_categories').paths.read.items({
    limit: -1,
  });

  return (
    <main className="">
      <section className="relative">
        <HeadlineCarousel data={headlineData} />
      </section>
      <section className="py-4 border-b border-primary-200 overflow-hidden mb-6">
        <CategorySwiper data={categories} current={slug} />
      </section>

      <div className="ui-container mb-5 mx-auto grid grid-cols-1 gap-2 lg:gap-8 lg:grid-cols-[60%,auto]">
        <section className="mb-5 w-full flex flex-col bg-white rounded-md p-3 shadow">
          <Lists category={slug === 'terbaru' ? undefined : slug} />
        </section>
        <div className="">
          <div className="sticky top-[88px] bg-white p-3 shadow rounded-md">
            <PopulerSide category={slug === 'terbaru' ? undefined : slug} />
          </div>
        </div>
      </div>
    </main>
  );
}
