'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useState } from 'react';
import { Mousewheel, Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import clsx from 'clsx';
import { Item } from 'react-photoswipe-gallery';
import BaseIcon from '@/components/icons/base-icon';
import { LightboxImageGallery } from '@/components/lightbox-image-gallery';
import { TPublicServiceItem } from '@/types';
import { nextImageUrl } from '@/init';
export default function Images({ data }: { data: TPublicServiceItem }) {
  const [imageActive, setImageActive] = useState(0);
  return (
    <LightboxImageGallery>
      {(open) => (
        <>
          <section
            className={clsx(
              'group relative flex justify-center bg-[#F5F5F5] rounded-xl h-[156px] sm:h-[383px] sm:col-span-2 xl:col-span-1'
            )}
            onClick={() => {
              return open(imageActive);
            }}
          >
            <div
              className="opacity-0 inset-0 absolute flex items-center justify-center rounded-xl bg-[#00000080]
        group-hover:opacity-100 z-10 transition-opacity ease-brand duration-250 cursor-pointer"
            >
              <button className="bg-primary/60 rounded-full p-3 text-white">
                <BaseIcon icon="zoom-loupe" className="w-6 h-6" />
              </button>
            </div>
            <Image
              src={data.images[imageActive].url}
              alt={''}
              width={400}
              height={400}
              className="w-full h-full rounded-xl transition-all ease-in-out duration-1000 "
            />
          </section>
          {data.images && data.images.length ? (
            <section className="flex sm:flex-col xl:flex-row gap-4 md:gap-6 sm:h-[557px] lg:h-[597px] xl:h-auto sm:order-last overflow-auto xl:overflow-hidden">
              <div className="flex sm:flex-col xl:flex-row gap-4 md:gap-6 sm:h-[557px] lg:h-[597px] xl:h-auto sm:order-last overflow-auto xl:overflow-hidden">
                <Swiper
                  direction={'horizontal'}
                  className="default-swiper"
                  slidesPerView={1.5}
                  spaceBetween={12}
                  modules={[Navigation, Mousewheel]}
                  mousewheel={true}
                  navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                  breakpoints={{
                    640: {
                      direction: 'vertical',
                      modules: [Mousewheel],
                      slidesPerView: 3,
                      spaceBetween: 24,
                    },
                    1280: {
                      direction: 'horizontal',
                      modules: [Navigation, Mousewheel],
                      slidesPerView: 3,
                      spaceBetween: 24,
                    },
                  }}
                >
                  {data.images.map((d, i) => (
                    <SwiperSlide key={i}>
                      <div
                        onMouseOver={() => setImageActive(i)}
                        className="relative h-[150px] sm:min-h-[170px] lg:min-h-[183px] xl:min-h-0 xl:h-[150px] min-w-[224px] xl:min-w-[256px] sm:w-full xl:w-[256px]
      flex flex-col gap-6 group rounded-xl overflow-hidden group cursor-zoom-in"
                      >
                        <Item
                          original={d.url}
                          thumbnail={nextImageUrl({
                            url: d.url,
                            width: 640,
                            quality: 75,
                          })}
                          width={d.width ?? 1000}
                          height={d.height ?? 1000}
                          alt=""
                        >
                          {({ ref, open }) => (
                            <Image
                              ref={
                                ref as React.MutableRefObject<HTMLImageElement>
                              }
                              onClick={open}
                              src={d.url}
                              alt={''}
                              width={300}
                              height={300}
                              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform ease-brand duration-250"
                            />
                          )}
                        </Item>
                      </div>
                    </SwiperSlide>
                  ))}
                  <div className="hidden xs:block md:hidden xl:block">
                    <button
                      className="swiper-button-prev
               transition-all ease-brand duration-300"
                    >
                      <BaseIcon className={'w-8 h-8'} icon="chevron-left" />
                    </button>
                    <button
                      className="swiper-button-next
               transition-all ease-brand duration-300"
                    >
                      <BaseIcon className={'w-8 h-8'} icon="chevron-right" />
                    </button>
                  </div>
                </Swiper>
              </div>
            </section>
          ) : null}
        </>
      )}
    </LightboxImageGallery>
  );
}
