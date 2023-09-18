import { apiResourceItemRead } from '@/lib/server';
import HomeHero from './_components/home-hero';
import HomeNewsHeadline from './_components/home-news-headline';
import UIBannerInfoWidgetList from '@/ui/banner-info/widget-list';
import { SwiperProps } from 'swiper/react';
import UIGrafikInfoWidgetList from '@/ui/grafik-info/widget-list';
import Link from 'next/link';
import UIApplicationWidgetList from '@/ui/application/widget-list';

async function BannerInfoList({ swiper }: { swiper?: SwiperProps }) {
  const data = await apiResourceItemRead('banner_info')
    .setQuery({ limit: 5 })
    .items({});
  return <UIBannerInfoWidgetList swiper={swiper} items={data} />;
}

async function GrafikInfoList() {
  const data = await apiResourceItemRead('grafik_info')
    .setQuery({ limit: 8 })
    .items({});
  return <UIGrafikInfoWidgetList items={data} />;
}
async function ApplicationList() {
  const data = await apiResourceItemRead('applications').items({});

  return <UIApplicationWidgetList items={data} />;
}

export default async function Page() {
  return (
    <main className="w-full overflow-hidden">
      <HomeHero />
      <HomeNewsHeadline />

      <section className="py-6 md:py-8 xl:py-12">
        <div className="container mx-auto 2xl:px-0 xl:max-w-7xl px-0 max-w-full xl:px-6">
          <BannerInfoList />
        </div>
      </section>

      <section className="py-6 md:py-8 xl:py-12">
        <div className="container bg-gray-100 mx-auto 2xl:px-0 xl:max-w-7xl px-0 max-w-full xl:px-6 rounded-lg">
          <GrafikInfoList />
        </div>
      </section>
      <section className="ui-container mb-10 mt-5">
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 mb-8">
          <h2 className="font-medium text-[28px] md:text-4xl leading-loose">
            Aplikasi
          </h2>
          <div className="flex-1 flex justify-center flex-col text-center">
            <div className="border-b border-gray-300" />
          </div>
          <Link href="/aplikasi" tabIndex={-1}>
            <button
              className="btn btn-sm btn-outline btn-primary normal-case"
              type="button"
            >
              Lihat Semua Aplikasi
            </button>
          </Link>
        </div>
        <ApplicationList />
      </section>
    </main>
  );
}
