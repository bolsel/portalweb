'use client';

import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';
import {
  Pagination,
  Navigation,
  Mousewheel,
  Autoplay,
  EffectCoverflow,
} from 'swiper/modules';
import { ComponentPropsWithoutRef, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { RequireOnlyOne, TApiResourcePathReturn } from '@/types';
import { IUICreateCustomizableDefine, UICreateCustomizable } from '../create';
import BlurImage from '@/components/blur-image';
import BaseIcon from '@/components/icons/base-icon';
import { useModal } from '@/components/modal/provider';
import { urlToWww } from '@/init';
import Link from 'next/link';
import useOnScreen from '@/lib/hooks/use-on-screen';

type _Item = TApiResourcePathReturn<'grafik_info'>['read']['items'][0];
type Props = {
  items?: _Item[];
  skeleton?: true;
  slideContainer?: ComponentPropsWithoutRef<'div'>;
};

export type UIGrafikInfoWidgetListType = IUICreateCustomizableDefine<
  RequireOnlyOne<Props, 'items' | 'skeleton'> & { swiper?: SwiperProps },
  { lightGallery: boolean; showAllButton: boolean }
>;
const UIGrafikInfoWidgetList: UIGrafikInfoWidgetListType['returnType'] = (
  props
) =>
  UICreateCustomizable<UIGrafikInfoWidgetListType>({
    props,
    defaults: {
      lightGallery: () => true,
      showAllButton: () => true,
    },
    Component({ swiper, slideContainer, items, render, skeleton }) {
      const containerRef = useRef<HTMLDivElement>(null);
      const swiperRef = useRef<SwiperRef>(null);
      const isVisible = useOnScreen(containerRef)
      
      const modal = useModal();
      const showModal = (item: _Item) => {
        modal?.show(
          <div className="w-full h-full">
            <BlurImage
              src={item.image.url}
              alt={item.title}
              title={item.title}
              width={400}
              height={600}
              data-src={item.image.url}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>,
          {
            showCloseButton: () => false,
            footer:
              () =>
              ({ closeModal }) =>
                (
                  <div className="bg-base-200 flex gap-4 w-full items-end justify-end py-4 z-[100] mt-auto md:mt-0 px-6">
                    <Link
                      className="btn btn-primary btn-sm text-white gap-2"
                      href={item.image.url}
                      target="_blank"
                      download
                    >
                      <BaseIcon icon="download" fontSize="18px" /> Ukuran Penuh
                    </Link>
                    <button
                      className="btn btn-outline btn-primary btn-sm text-white gap-2"
                      onClick={closeModal}
                    >
                      Tutup
                    </button>
                  </div>
                ),
          }
        );
      };
      swiper = {
        ...swiper,
        className: clsx(
          'banner__swiper w-full select-none pt-10',
          swiper?.className ?? ''
        ),
      };
      useEffect(() => {
        if (isVisible) {
          if (swiperRef.current) {
            swiperRef.current.swiper.autoplay.start()
          }
        }else{
          if (swiperRef.current) swiperRef.current.swiper.autoplay.stop();
        }
      }, [isVisible]);
      return (
        <div
          ref={containerRef}
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
            modules={[
              EffectCoverflow,
              Pagination,
              Navigation,
              Autoplay,
              Mousewheel,
            ]}
            slidesPerView={'auto'}
            effect={'coverflow'}
            // grabCursor={true}
            centeredSlides={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            speed={750}
            // loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{
              el: '.banner__swiper-pagination',
              type: 'bullets',
              clickable: true,
            }}
            navigation={{
              nextEl: '.banner__button-next',
              prevEl: '.banner__button-prev',
            }}
            {...swiper}
          >
            {skeleton
              ? [...Array(5)].map((v, i) => (
                  <SwiperSlide
                    key={i}
                    className={clsx(
                      '!w-[300px] !h-[500px] xl:!w-[400px] xl:!h-[600px] animate-pulse bg-base-200 rounded-lg'
                    )}
                  ></SwiperSlide>
                ))
              : (items ?? []).map((d, i) => {
                  const _Image = () => {
                    return (
                      <BlurImage
                        src={d.image.url}
                        alt={d.title}
                        title={d.title}
                        width={400}
                        height={600}
                        data-src={d.image.url}
                        className="object-cover w-full h-full rounded-lg"
                        onClick={() => showModal(d)}
                      />
                    );
                  };
                  return (
                    <SwiperSlide
                      key={i}
                      data-src={d.image.url}
                      className={clsx(
                        // 'w-[400px] h-[600px] object-cover',
                        `!bg-cover !bg-center object-cover`,
                        '!w-[300px] !h-[500px] xl:!w-[400px] xl:!h-[600px]'
                      )}
                      {...slideContainer}
                    >
                      {_Image()}
                    </SwiperSlide>
                  );
                })}
            <div className="banner__swiper-pagination mt-8" />
            <button
              className="hidden md:flex banner__navigation banner__button-prev"
              aria-label="Prev"
            >
              <BaseIcon className={'w-8 h-8'} icon="chevron-left" />
            </button>
            <button
              className="hidden md:flex banner__navigation banner__button-next"
              aria-label="Next"
            >
              <BaseIcon className={'w-8 h-8'} icon="chevron-right" />
            </button>
          </Swiper>

          {render('showAllButton') && (
            <div className="w-full flex items-center justify-center py-5">
              <a href={urlToWww('/informasi-grafik')}>
                <button
                  className="btn btn-sm btn-outline btn-primary normal-case"
                  type="button"
                >
                  Lihat Semua
                </button>
              </a>
            </div>
          )}
        </div>
      );
    },
  });

export default UIGrafikInfoWidgetList;
