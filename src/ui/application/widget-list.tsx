'use client';

import Link from 'next/link';
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel, Autoplay } from 'swiper/modules';
import { useRef } from 'react';
import { RequireOnlyOne, TApiResourcePathReturn } from '@/types';
import { IUICreateCustomizableDefine, UICreateCustomizable } from '../create';
import BaseIcon from '@/components/icons/base-icon';

type Props = {
  items?: TApiResourcePathReturn<'applications'>['read']['items'];
  skeleton?: true;
};

export type UIApplicationWidgetListType = IUICreateCustomizableDefine<
  RequireOnlyOne<Props, 'items' | 'skeleton'> & { swiper?: SwiperProps }
>;
const UIApplicationWidgetList: UIApplicationWidgetListType['returnType'] = (
  props
) =>
  UICreateCustomizable<UIApplicationWidgetListType>({
    props,
    defaults: {},
    Component({ swiper, items, skeleton }) {
      const swiperRef = useRef<SwiperRef>(null);
      if (skeleton) {
        return (
          <div className="h-[230px] md:h-[220px] bg-base-200 animate-pulse rounded-lg p-5">
            <div className="flex justify-between h-full gap-3">
              {[...Array(3)].map((v, i) => (
                <div key={i} className="bg-white w-full p-5 rounded-lg">
                  <div className="bg-base-200 animate-pulse w-5/12 h-3 mb-6 rounded-lg"></div>
                  <div className="bg-base-200 animate-pulse h-5 mb-3 rounded-lg"></div>
                  <div className="bg-base-200 animate-pulse h-5 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        );
      }
      return (
        <div
          className="w-full h-full"
          onMouseOver={() => {
            if (swiperRef.current) swiperRef.current.swiper.autoplay.pause();
          }}
          onMouseOut={() => {
            if (swiperRef.current) {
              swiperRef.current.swiper.autoplay.resume();
            }
          }}
        >
          <Swiper
            ref={swiperRef}
            modules={[Pagination, Navigation, Mousewheel, Autoplay]}
            slidesPerView={1}
            spaceBetween={0}
            slidesPerGroup={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              el: '.swiper-pagination',
              type: 'bullets',
              clickable: true,
            }}
            breakpoints={{
              640: {
                speed: 750,
                slidesPerView: 2.3,
                slidesPerGroup: 2.3,
                spaceBetween: 16,
              },
              1280: {
                speed: 750,
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 16,
              },
            }}
            passiveListeners={true}
            mousewheel={true}
            className="default-swiper"
            {...swiper}
          >
            {items.map((item, i) => (
              <SwiperSlide key={i}>
                <div
                  className="h-[230px] md:h-[220px] flex flex-col gap-2 group
    bg-white p-6 overflow-y-auto rounded-xl border border-white hover:border-primary-700 hover:shadow transition-colors ease-brand duration-250"
                >
                  <div className="">
                    <span
                      className="inline-block rounded-md px-2 py-1 text-xs font-semibold text-gray-700 bg-primary-50
group-hover:text-primary-700 group-hover:bg-primary-200"
                    >
                      {item.slug}
                    </span>
                  </div>

                  <div>
                    <div className="font-lato font-bold text-sm text-blue-gray-800 leading-1 md:text-base line-clamp-2">
                      {item.title}
                    </div>
                  </div>
                  <p className="font-lato text-sm font-normal text-[#415C84] leading-5 line-clamp-3 md:line-clamp-2">
                    {item.description}
                  </p>
                  {item.link ? (
                    <div className="flex-1 flex items-end">
                      <Link
                        href={item.link}
                        target="_blank"
                        className="inline-flex text-sm group-hover:bg-primary group-hover:text-white rounded-lg px-3 py-1 items-center gap-4 transition-colors ease-brand duration-250"
                      >
                        Buka Aplikasi <BaseIcon icon="external-link" />
                      </Link>
                    </div>
                  ) : null}
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination navigation__wrapper mt-8" />
            <div className="">
              <button
                className="swiper-button-prev
    transition-all ease-brand duration-300 !top-[calc(100%-20px)]"
                aria-label="Prev"
              >
                <BaseIcon className={'!w-8 !h-8'} icon="chevron-left" />
              </button>
              <button
                className="swiper-button-next
    transition-all ease-brand duration-300 !top-[calc(100%-20px)]"
                aria-label="Next"
              >
                <BaseIcon className={'!w-8 !h-8'} icon="chevron-right" />
              </button>
            </div>
          </Swiper>
        </div>
      );
    },
  });

export default UIApplicationWidgetList;
