import Link from 'next/link';
import Tabs from './_Tabs';
import Carousel from './_Carousel';
import { WidgetGPR } from '@/components/widgets/gpr-widget';
import {
  apiResourceItemPathRead,
  apiResourceItemRead,
  toDateString,
} from '@/lib/server';

function resourceNewsHomeHeadlineTab(type: 'popular' | 'latest') {
  return apiResourceItemRead('news')
    .setQuery({
      limit: 4,
      sort: [type === 'popular' ? '-view_count' : '-publish_date'],
    })
    .items({
      normalizer: [
        ['title', 'slug', 'publish_date', { category: ['name'] }],
        (data) => {
          return {
            ...data,
            publish_date_format: toDateString(data.publish_date),
          };
        },
      ],
    });
}

export default async function HomeNewsHeadline() {
  const dataLatest = await resourceNewsHomeHeadlineTab('latest');
  const dataPopular = await resourceNewsHomeHeadlineTab('popular');
  const dataCarousel = await apiResourceItemPathRead('news').items({
    limit: 5,
  });

  return (
    <>
      <section
        className="relative top-[-12rem] z-10 mb-[-12rem] pb-6
      md:top-[-14rem] md:mb-[-14rem] md:pb-8 lg:-top-40 lg:-mb-40 xl:pb-12"
      >
        <div className="ui-container">
          <div
            className="grid h-full w-full grid-cols-1 gap-6 rounded-xl bg-white
          p-4 shadow md:p-8 xl:grid-cols-[300px,1fr]"
          >
            <section className="grid h-full w-full grid-cols-1 gap-4">
              <div className="mb-4 flex flex-col items-center gap-1 md:flex-row md:gap-4">
                <h1 className="text-[28px] font-medium leading-loose md:text-4xl">
                  Berita Terkini
                </h1>
                <div className="flex flex-1 flex-col justify-center text-center">
                  <div className="border-b border-gray-300" />
                </div>
                <Link
                  href="/berita/kategori/terbaru"
                  tabIndex={-1}
                  className="normal-case btn btn-sm btn-outline btn-primary"
                >
                  Lihat Semua Berita
                </Link>
              </div>
              <div className="grid w-full grid-cols-1 gap-8 md:grid-rows-1 lg:grid-cols-[1fr,330px]">
                <Carousel data={dataCarousel} />
                <Tabs dataLatest={dataLatest} dataPopular={dataPopular} />
              </div>
            </section>
            <section
              className="relative flex h-[600px] w-full max-w-[500px] items-center justify-center justify-self-center
    overflow-hidden rounded-lg bg-[#262879] md:h-[625px] lg:h-[608px] xl:order-first"
            >
              <WidgetGPR />
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
