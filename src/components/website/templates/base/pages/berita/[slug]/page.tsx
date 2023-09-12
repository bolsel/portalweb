import BlurImage from '@/components/blur-image';
import ContentBlocks from '@/components/content-blocks';
import BaseIcon from '@/components/icons/base-icon';
import NewsShareItem from '@/components/share/item-news';
import { SiteContextType } from '@/components/website/provider';
import { TWebNewsItemBySlug } from '@/types';
import Latest from './_Latest';

export default function Page({
  data: { item },
  site,
}: SiteContextType<{ slug: string }, { item: TWebNewsItemBySlug }>) {
  return (
    <article className="px-5">
      <section className="h-full grid grid-cols-1 gap-8 lg:grid-cols-[60%,auto] xl:gap-[72px]">
        <div className="flex flex-col gap-7">
          <div className="w-full min-h-screen">
            <div className="flex flex-col gap-2 mt-3">
              <BlurImage
                src={item.image_cover.url}
                alt={item.title}
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-full rounded-lg"
              />
              <div className="flex flex-col gap-1 text-gray-700">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <BaseIcon icon="calendar" className="w-4 h-4" />
                    <p className="text-sm">
                      {item.publish_date_date.toLocaleDateString('id-ID', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <BaseIcon icon="eye" className="w-4 h-4" />
                    <p className="text-sm">{item.view_count}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <BaseIcon icon="share" className="w-4 h-4" />
                    <p className="text-sm">{item.shared_count}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BaseIcon icon="tags" className="w-4 h-4" />
                  <div className="flex gap-2">
                    {(item.tags ?? []).map((tag, i) => {
                      return (
                        <span
                          key={i}
                          className="text-xs inline-block px-2 py-1 rounded-lg bg-base-200"
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BaseIcon icon="pencil" className="w-4 h-4" />
                  <p className="text-sm">
                    Penulis:{' '}
                    <span className="capitalize italic">{item.writer}</span>
                  </p>
                  <div className="hidden lg:flex items-center gap-2">
                    | <BaseIcon icon="camera" className="w-4 h-4" />
                    <p className="text-sm">
                      Peliput:{' '}
                      <span className="capitalize italic">{item.reporter}</span>
                    </p>
                  </div>
                </div>
                <div className="lg:hidden flex items-center gap-2">
                  <BaseIcon icon="camera" className="w-4 h-4" />
                  <p className="text-sm">
                    Peliput:{' '}
                    <span className="capitalize italic">{item.reporter}</span>
                  </p>
                </div>
              </div>
            </div>
            {item.content && item.content.blocks && (
              <div className="prose max-w-none">
                <ContentBlocks {...item.content} />
              </div>
            )}
          </div>
          <p className="font-lora text-gray-800"></p>
        </div>
        <section className="my-5">
          <div className="flex flex-col gap-2 lg:sticky lg:top-[88px]">
            <div className="flex flex-col gap-3 w-full mb-5">
              <p className="inline-flex gap-3 font-lato text-xs text-blue-gray-200 leading-5">
                <BaseIcon
                  icon="share"
                  className="self-start text-primary w-5 h-5"
                />
                Bagikan Berita
              </p>
              <NewsShareItem item={item} />
            </div>
            <div className="flex w-full h-[38px] mb-6">
              <div className="border-b-[3px] border-primary">
                <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
                  Berita Terbaru
                </h1>
              </div>
              <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
            </div>
            <Latest webId={site.id} />
          </div>
        </section>
      </section>
    </article>
  );
}
