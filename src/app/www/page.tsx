import { apiResourceItemRead } from '@/lib/server';
import HomeHero from './_components/home-hero';
import HomeNewsHeadline from './_components/home-news-headline';
import UIBannerInfoWidgetList from '@/ui/banner-info/widget-list';
import { SwiperProps } from 'swiper/react';
import UIGrafikInfoWidgetList from '@/ui/grafik-info/widget-list';

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
        <div className="container bg-gray-200 mx-auto 2xl:px-0 xl:max-w-7xl px-0 max-w-full xl:px-6 rounded-lg">
          <GrafikInfoList />
        </div>
      </section>
    </main>
  );
}
