'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useRef, useState } from 'react';
import { Mousewheel, Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import clsx from 'clsx';
import { LightGallery as TLightGallery } from 'lightgallery/lightgallery';
import LightGallery from '@/components/light-gallery';

export default function Images({ data }) {
  const lightGalleryRef = useRef<TLightGallery | null>(null);
  const [imageActive, setImageActive] = useState(0);
  return (
    <>
      <section
        className={clsx(
          'group relative flex justify-center bg-[#F5F5F5] rounded-xl h-[156px] sm:h-[383px] sm:col-span-2 xl:col-span-1'
        )}
        onClick={() => lightGalleryRef.current?.openGallery(imageActive)}
      >
        <div
          className="opacity-0 inset-0 absolute flex items-center justify-center rounded-xl bg-[#00000080]
        group-hover:opacity-100 z-10 transition-opacity ease-brand duration-250 cursor-pointer"
        >
          <button className="bg-primary/60 rounded-full p-3 text-white">
            <Icon icon="mdi:loupe" className="w-6 h-6" />
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
          <LightGallery
            onInit={(detail) => {
              lightGalleryRef.current = detail.instance;
            }}
            elementClassNames="hidden"
          >
            {data.images.map((d, i) => {
              return (
                <a className="" href={d.url} key={i}>
                  <Image
                    alt=""
                    sizes="100vw"
                    fill
                    src={d.url}
                    className="object-cover"
                  />
                </a>
              );
            })}
          </LightGallery>
          <div className="xl:hidden flex sm:flex-col xl:flex-row gap-4 md:gap-6 sm:h-[557px] lg:h-[597px] xl:h-auto sm:order-last overflow-auto xl:overflow-hidden">
            {data.images.map((d, i) => (
              <div
                onClick={() => lightGalleryRef.current?.openGallery(i)}
                key={i}
                className="relative h-[150px] sm:min-h-[170px] lg:min-h-[183px] xl:min-h-0 xl:h-[150px] min-w-[224px] xl:min-w-[256px] sm:w-full xl:w-[256px]
    flex flex-col gap-6 group rounded-xl overflow-hidden group"
              >
                <Image
                  alt=""
                  width={300}
                  height={300}
                  src={d.url}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform ease-brand duration-250"
                />
              </div>
            ))}
          </div>
          <div className="hidden xl:block w-full">
            <Swiper
              className="default-swiper"
              slidesPerView={3}
              spaceBetween={24}
              modules={[Navigation, Mousewheel]}
              mousewheel={true}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
            >
              {data.images.map((d, i) => (
                <SwiperSlide key={i}>
                  <div
                    onMouseOver={() => setImageActive(i)}
                    className="relative h-[150px] sm:min-h-[170px] lg:min-h-[183px] xl:min-h-0 xl:h-[150px] min-w-[224px] xl:min-w-[256px] sm:w-full xl:w-[256px]
      flex flex-col gap-6 group rounded-xl overflow-hidden group"
                  >
                    <Image
                      src={d.url}
                      alt={''}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform ease-brand duration-250"
                    />
                  </div>
                </SwiperSlide>
              ))}
              <div className="">
                <button
                  className="swiper-button-prev
               transition-all ease-brand duration-300"
                >
                  <Icon className={'w-8 h-8'} icon="mdi:chevron-left" />
                </button>
                <button
                  className="swiper-button-next
               transition-all ease-brand duration-300"
                >
                  <Icon className={'w-8 h-8'} icon="mdi:chevron-right" />
                </button>
              </div>
            </Swiper>
          </div>
        </section>
      ) : null}
    </>
  );
}
