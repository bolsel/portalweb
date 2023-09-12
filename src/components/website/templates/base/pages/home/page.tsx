import SiteNewsListsSwr from '@/components/website/news-lists-swr';
import SiteNewsWwwList from '@/components/website/news-www-list';
import { apiResourceItemRead } from '@/lib/server';
import UIBannerInfoWidgetList from '@/ui/banner-info/widget-list';
import GrafikInfoList from './_GrafikInfoList';

async function BannerInfoList() {
  const data = await apiResourceItemRead('banner_info')
    .setQuery({ limit: 5 })
    .items({});
  return <UIBannerInfoWidgetList swiper={{ breakpoints: {} }} items={data} />;
}

export default async function Page() {
  return (
    <>
      <section className="p-1 lg:p-2">
        <BannerInfoList />
      </section>

      <section className="p-3 md:p-4 lg:py-8 lg:px-10 h-full grid grid-cols-1 gap-6 lg:grid-cols-[65%,30%] md:gap-[72px]">
        <div className="flex flex-col gap-7">
          <div className="flex w-full h-[38px]">
            <div className="border-b-[3px] border-primary">
              <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
                Berita Terbaru
              </h1>
            </div>
            <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
          </div>
          <SiteNewsListsSwr />
          <SiteNewsWwwList />
        </div>
        <section className="w-full max-w-full">
          <div className="flex flex-col gap-7 lg:sticky lg:top-[70px]">
            <div className="w-full">
              <div className="flex w-full h-[38px] mb-6">
                <div className="border-b-[3px] border-primary">
                  <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
                    Info Grafik Terbaru
                  </h1>
                </div>
                <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
              </div>
              <div className="px-0 lg:px-5 bg-primary-50 w-full rounded-lg">
                <GrafikInfoList />
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
