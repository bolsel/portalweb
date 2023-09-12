import SiteNewsListsSwr from '@/components/website/news-lists-swr';
import SiteNewsWwwList from '@/components/website/news-www-list';

export default function Page() {
  return (
    <div className="p-10 grid grid-cols-1 gap-2 lg:gap-8 lg:grid-cols-[60%,auto]">
      <section className="mb-5 w-full flex flex-col  p-3 min-h-[1200px] ">
        <SiteNewsListsSwr />
      </section>
      <div className="">
        <div className="flex flex-col gap-7 lg:sticky lg:top-[88px] ">
          <SiteNewsWwwList side />
        </div>
      </div>
    </div>
  );
}
