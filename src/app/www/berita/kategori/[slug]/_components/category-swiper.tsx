'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import Link from 'next/link';
import clsx from 'clsx';
import { TApiResourcePathReturn } from '@/types';

export default function CategorySwiper({
  data,
  current,
}: {
  current?: string;
  data: TApiResourcePathReturn<'news_categories'>['read']['items'];
}) {
  return (
    <div className="ui-container">
      <Swiper
        slidesPerView="auto"
        spaceBetween={64}
        passiveListeners={true}
        mousewheel={true}
        modules={[Mousewheel]}
      >
        <>
          <SwiperSlide className="!w-[fit-content]">
            <Link href="/berita/kategori/terbaru">
              <button
                className={clsx(
                  'px-6 py-2 rounded-full font-heading uppercase cursor-pointer hover:bg-primary hover:text-white text-gray-600',
                  {
                    'bg-primary !text-white': current === 'terbaru',
                  }
                )}
              >
                Terbaru
              </button>
            </Link>
          </SwiperSlide>

          {data.map((item, index) => (
            <SwiperSlide className="!w-[fit-content]" key={index}>
              <Link href={`/berita/kategori/${item.slug}`}>
                <button
                  className={clsx(
                    'px-6 py-2 rounded-full font-heading uppercase cursor-pointer hover:bg-primary hover:text-white text-gray-600',
                    {
                      'bg-primary !text-white': current === item.slug,
                    }
                  )}
                >
                  {item.name}
                </button>
              </Link>
            </SwiperSlide>
          ))}
        </>
      </Swiper>
    </div>
  );
}
