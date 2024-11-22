import BlurImage from '@/components/blur-image';
import ContentBlocks from '@/components/content-blocks';
import BaseIcon from '@/components/icons/base-icon';
import NewsShareItem from '@/components/share/item-news';
import { SiteContextType } from '@/components/website/provider';
import { TWebPageItemBySlug } from '@/types';

export default function Page({
  data: { item },
  site,
}: SiteContextType<{ slug: string }, { item: TWebPageItemBySlug }>) {
  return (
    <article className="px-5">
      <section className="h-full grid grid-cols-1 gap-8 lg:grid-cols-[70%,25%] xl:gap-[72px]">
        <div className="flex flex-col gap-7">
          <div className="w-full min-h-screen">
            <div className="flex flex-col gap-2 mt-3">
              {item.image_cover && (
                <BlurImage
                  src={item.image_cover.url}
                  alt={item.title}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="image-zoom w-full h-full rounded-lg"
                />
              )}
            </div>
            {item.content && item.content.blocks && (
              <div className="prose max-w-none">
                <ContentBlocks {...item.content} />
              </div>
            )}
          </div>
          <p className="font-lora text-gray-800"></p>
        </div>
        <div className="my-5 w-full">
          <div className="flex flex-col gap-2 lg:sticky lg:top-[88px] w-full overflow-auto">
            <div className="flex flex-col gap-3 mb-5 overflow-y-auto">
              <p className="inline-flex gap-3 font-lato text-xs text-blue-gray-200 leading-5">
                <BaseIcon
                  icon="share"
                  className="self-start text-primary w-5 h-5"
                />
                Bagikan
              </p>
            </div>
            <NewsShareItem item={item as any} isPage />
          </div>
        </div>
      </section>
    </article>
  );
}
