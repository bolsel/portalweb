'use client';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { TApiResourcePathReturn } from '@/types';
import UICarousel from '@/ui/carousel';
import BaseIcon from '@/components/icons/base-icon';

export default function HeadlineCarousel({
  data,
}: {
  data: TApiResourcePathReturn<'news'>['read']['items'];
}) {
  return (
    <UICarousel
      items={data.map((d) => ({ ...d, image: d.image_cover.url }))}
      customizes={{
        hoverAnimate: () => true,
        autoPlay: () => true,
        pauseOnHover: () => false,
        mainClass: ({ defaults }) =>
          clsx(defaults.mainClass, 'h-[650px] bg-gray-800'),
        ContentComponent() {
          return function Component({
            item,
            items,
            currentIndex,
            setCurrentIndex,
          }) {
            return (
              <>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(56.33% 56.33% at 50.59% 43.67%, rgba(0, 23, 28, 0.5) 0%, rgba(0, 11, 14, 0.7) 46.15%, rgba(0, 11, 14, 0.82) 100%)',
                  }}
                />
                <div className="absolute w-full bottom-0 text-white">
                  <div className="ui-container relative grid grid-cols-1 xl:grid-cols-9">
                    <div className="flex flex-col justify-end h-full lg:col-span-6 xl:pr-32 pb-6 md:pb-10">
                      <div>
                        <p className="font-heading uppercase leading-relaxed tracking-wider opacity-80 mb-1">
                          {item.category?.name}
                        </p>
                        <h3 className="line-clamp-3 md:line-clamp-2 lg:line-clamp-3 text-[23px] font-content-title font-bold md:text-3xl lg:text-4xl leading-9 md:!leading-[48px] mb-6 max-h-[108px] lg:max-h-full">
                          {item.title}
                        </h3>
                        <div className="flex flex-col md:flex-row gap-2 opacity-100 md:opacity-60 text-sm mb-6">
                          <div className="flex items-center gap-2">
                            <BaseIcon icon="calendar" className="w-4 h-4" />
                            <p className="text-sm md:text-base">
                              <span>{item.publish_date_format}</span>
                            </p>
                          </div>
                          <div className="hidden md:block">|</div>
                          <div className="flex items-center gap-2">
                            <BaseIcon icon="pencil" className="w-4 h-4" />
                            <p className="text-sm md:text-base capitalize">
                              Penulis: {item.writer} | Editor: {item.editor}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="md:flex md:justify-between md:items-center">
                        <Link href={`/berita/${item.slug}`}>
                          <button
                            type="button"
                            className="w-full md:w-[fit-content] border border-white border-opacity-30 px-4 py-2 rounded-lg mb-4 md:mb-0 hover:bg-white hover:bg-opacity-10"
                          >
                            Baca Selengkapnya
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="h-48 xl:h-full overflow-y-auto xl:block col-span-3 p-4 rounded-tl-xl rounded-tr-xl bg-white bg-opacity-5 backdrop-filter backdrop-blur-xl border-l border-t border-white border-opacity-10">
                      <p className="p-2 uppercase mb-1 font-bold">
                        Berita Terbaru
                      </p>
                      <div className="flex flex-col gap-2">
                        {items.map((_item, index) => (
                          <div
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className="group cursor-pointer"
                          >
                            <div
                              className={clsx('flex gap-4 p-2', {
                                'bg-white bg-opacity-10 rounded-xl':
                                  currentIndex === index,
                              })}
                            >
                              <div className="flex-shrink-0 overflow-hidden rounded-xl w-[92px] h-[92px]">
                                <Image
                                  src={_item.image}
                                  alt={_item.title}
                                  width={92}
                                  height={92}
                                  className={clsx(
                                    'flex-shrink-0 object-cover w-full h-full'
                                  )}
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <p
                                  className={clsx(
                                    'text-xs font-medium uppercase opacity-50',
                                    {
                                      '!opacity-100': currentIndex === index,
                                    }
                                  )}
                                >
                                  {_item.category?.name}
                                </p>
                                <p className="line-clamp-2 text-sm leading-relaxed">
                                  {_item.title}
                                </p>
                                <div className="flex gap-2">
                                  <BaseIcon
                                    icon="calendar"
                                    className={clsx('w-4 h-4 opacity-50', {
                                      '!opacity-100': currentIndex === index,
                                    })}
                                  />
                                  <p
                                    className={clsx('text-xs opacity-50', {
                                      '!opacity-100': currentIndex === index,
                                    })}
                                  >
                                    {_item.publish_date_format}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          };
        },
      }}
    />
  );
}
