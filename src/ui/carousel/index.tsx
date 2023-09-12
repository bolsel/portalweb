'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { IUICreateCustomizableDefine, UICreateCustomizable } from '../create';
import { AnimatePresence, motion } from 'framer-motion';
import BlurImage from '@/components/blur-image';

type ItemType<I extends Record<string, any>> = { image: string } & I;

type ComponentProps<I extends Record<string, any>> = {
  next(): void;
  prev(): void;
  item: ItemType<I>;
  currentIndex: number;
  items: ItemType<I>[];
  setCurrentIndex: (index: number) => void;
};
export type UICarouselComponentType<
  I extends Record<string, any> = Record<string, any>
> = FC<ComponentProps<ItemType<I>>>;

export type UICarouselType<I extends Record<string, any>> =
  IUICreateCustomizableDefine<
    {
      items: ItemType<I>[];
    },
    {
      pauseOnHover: boolean;
      autoPlay: boolean;
      hoverAnimate: boolean;
      /**
       * main component list items
       */
      Component: FC<Omit<ComponentProps<ItemType<I>>, 'item'>>;
      ImageComponent: UICarouselComponentType<ItemType<I>>;
      ContentComponent: UICarouselComponentType<ItemType<I>>;
      duration: number;
      mainClass: string;
    }
  >;
const UICarousel = <I extends Record<string, any>>(
  props: UICarouselType<I>['props']
) => {
  return UICreateCustomizable<UICarouselType<I>>({
    props,
    defaults: {
      autoPlay: () => true,
      pauseOnHover: () => true,
      duration: () => 3000,
      hoverAnimate: () => false,
      mainClass: ({ render }) =>
        clsx('ui-carousel overflow-hidden relative', {
          group: render('hoverAnimate'),
        }),
      Component({ render }) {
        return function c({
          currentIndex,
          items,
          next,
          prev,
          setCurrentIndex,
        }) {
          const callComponent = (item: any, c: UICarouselComponentType<I>) =>
            c({ currentIndex, item, items, next, prev, setCurrentIndex });
          return (
            <AnimatePresence>
              {items.map((item, i) => {
                return currentIndex === i ? (
                  <motion.div
                    key={i}
                    className="absolute h-full w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      opacity: { duration: 0.9, ease: 'circOut' },
                    }}
                  >
                    {callComponent(item, render('ImageComponent'))}
                    {callComponent(item, render('ContentComponent'))}
                  </motion.div>
                ) : null;
              })}
            </AnimatePresence>
          );
        };
      },
      ImageComponent() {
        return function Component({ item }) {
          return (
            <BlurImage
              sizes="100%"
              fill
              quality={75}
              src={item.image}
              alt={''}
              priority
              className={clsx(
                'carousel-bg bg-no-repeat object-cover bg-cover bg-center w-full h-full group-hover:scale-110'
              )}
            />
          );
        };
      },
      ContentComponent() {
        return function Component() {
          return <div></div>;
        };
      },
    },
    Component: ({ items, render }) => {
      const [currentIndex, setCurrentIndex] = useState(0);
      const [pause, setPause] = useState(false);
      const next = useCallback(() => {
        setCurrentIndex(
          currentIndex >= items.length - 1 ? 0 : currentIndex + 1
        );
      }, [currentIndex, items.length]);
      const prev = () => {
        setCurrentIndex(
          currentIndex <= 0 ? items.length - 1 : currentIndex - 1
        );
      };
      const onMouseOver = () => {
        if (render('pauseOnHover')) {
          setPause(true);
        }
      };
      const onMouseOut = () => {
        if (render('pauseOnHover')) {
          setPause(false);
        }
      };
      useEffect(() => {
        const _interval = setInterval(() => {
          if (!pause && render('autoPlay')) {
            next();
          }
        }, render('duration'));
        return () => clearInterval(_interval);
      }, [currentIndex, pause, next, render]);

      return (
        <div
          className={render('mainClass')}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        >
          {render('Component')({
            items,
            currentIndex,
            next,
            prev,
            setCurrentIndex,
          })}
        </div>
      );
    },
  });
};
export default UICarousel;
