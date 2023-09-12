'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import UICarousel from '@/ui/carousel';
import BaseIcon from '@/components/icons/base-icon';
import { TApiResourcePathReturn } from '@/types';

export default function Carousel({
  data,
}: {
  data: TApiResourcePathReturn<'news'>['read']['items'];
}) {
  return (
    <UICarousel
      items={
        data?.map((d) => ({
          ...d,
          ...{ image: d.image_cover.url },
        })) ?? []
      }
      customizes={{
        hoverAnimate: () => true,
        mainClass: ({ defaults, items }) =>
          clsx(defaults.mainClass, 'bg-gray-200 w-full rounded-lg h-[536px]'),
        ContentComponent() {
          return function ContentComponent({
            items,
            currentIndex,
            next,
            prev,
          }) {
            return (
              <div
                className="ui-news-carousel visible inline-block h-[60%] md:h-[50%] absolute bottom-0 w-full bg-black
            bg-opacity-50 transition duration-500 ease-in-out group-hover:bg-opacity-70 backdrop-filter backdrop-blur-lg
            rounded-lg px-8 py-6 text-white"
              >
                <div className="w-full h-full relative">
                  <AnimatePresence>
                    {items.map((item, i) => {
                      return currentIndex === i ? (
                        <motion.div
                          className="absolute w-full h-full"
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{
                            opacity: 0,
                          }}
                          transition={{
                            opacity: { duration: 0.9, ease: 'easeInOut' },
                          }}
                        >
                          <div className="flex flex-col h-full justify-between">
                            <div className="md:hidden flex items-center justify-between py-2 px-3 rounded-full bg-white bg-opacity-20 mb-4">
                              <button
                                className="cursor-pointer"
                                aria-label="Berita Sebelumnya"
                                onClick={prev}
                              >
                                <BaseIcon
                                  icon="chevron-left"
                                  aria-hidden="true"
                                />
                              </button>
                              <p className="text-sm text-white">
                                <span className="font-bold mr-1">
                                  {currentIndex + 1}
                                </span>
                                dari {items.length}
                              </p>
                              <button
                                className="cursor-pointer"
                                aria-label="Berita Selanjutnya"
                                onClick={next}
                              >
                                <BaseIcon
                                  icon="chevron-right"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                            <div className="flex-grow">
                              <p className="font-roboto text-sm uppercase leading-relaxed tracking-wider opacity-80 mb-1">
                                {item.category.name}
                              </p>
                              <Link href={`/berita/${item.slug}`}>
                                <h2
                                  title={item.title}
                                  className="line-clamp-3 md:line-clamp-2 font-heading font-bold text-xl md:text-2xl leading-9 md:leading-10 max-h-[108px] md:max-h-[90px] mb-3"
                                >
                                  {item.title}
                                </h2>
                              </Link>
                              <div className="flex flex-col md:flex-row gap-2 opacity-60 text-xs">
                                <p
                                  className="flex items-center gap-2 md:pr-2"
                                  title="Diterbitkan"
                                >
                                  <BaseIcon
                                    icon="calendar"
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                  />
                                  <span className="sr-only">
                                    Diterbitkan pada
                                  </span>
                                  <span>{item.publish_date_format}</span>
                                </p>
                              </div>
                            </div>

                            <div className="md:flex justify-between items-center">
                              <Link href={`/berita/${item.slug}`} tabIndex={-1}>
                                <button
                                  type="button"
                                  className="w-full text-sm border border-white border-opacity-30 px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
                                >
                                  Baca Selengkapnya
                                </button>
                              </Link>
                              <div className="hidden md:flex items-center gap-4">
                                <button
                                  className="cursor-pointer"
                                  aria-label="Berita Sebelumnya"
                                  onClick={prev}
                                >
                                  <BaseIcon
                                    icon="chevron-left"
                                    aria-hidden="true"
                                  />
                                </button>
                                <p className="text-sm text-gray-300">
                                  <span className="font-bold text-white mr-1">
                                    {currentIndex + 1}
                                  </span>
                                  dari {items.length}
                                </p>
                                <button
                                  className="cursor-pointer"
                                  aria-label="Berita Selanjutnya"
                                  onClick={next}
                                >
                                  <BaseIcon
                                    icon="chevron-right"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ) : null;
                    })}
                  </AnimatePresence>
                </div>
              </div>
            );
          };
        },
      }}
    />
  );
}
