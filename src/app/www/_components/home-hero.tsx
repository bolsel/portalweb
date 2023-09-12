'use client';

import clsx from 'clsx';
import styles from './home-hero.module.css';
import UICarousel from '@/ui/carousel';

export default function HomeHero() {
  return (
    <>
      <UICarousel
        items={[
          { image: '/images/bg/1.jpeg' },
          { image: '/images/bg/2.jpeg' },
          { image: '/images/bg/3.jpeg' },
          { image: '/images/bg/4.jpeg' },
        ]}
        customizes={{
          mainClass: ({ defaults }) => clsx(defaults.mainClass, 'h-[740px]'),
          pauseOnHover: () => false,
          duration: () => 5000,
          hoverAnimate: () => true,
          ContentComponent() {
            // eslint-disable-next-line react/display-name
            return () => {
              return (
                <>
                  <div className="ui-filter-default absolute top-0 h-full w-full" />
                  <section className="absolute top-0 flex h-[740px] w-full items-center justify-center">
                    <div>
                      <div className="-mt-20 flex flex-col items-center bg-no-repeat py-3">
                        <h2
                          className={clsx(
                            'u mb-2 text-center font-intro text-xl uppercase italic leading-normal tracking-tight text-white md:text-3xl lg:text-4xl'
                          )}
                        >
                          Portal Resmi
                        </h2>
                        <h2
                          className={clsx(
                            'mb-2 text-center font-intro text-2xl uppercase leading-normal tracking-tight text-white md:mb-3 md:text-4xl lg:mb-2 lg:text-[42px]'
                          )}
                        >
                          Pemerintah Kabupaten
                        </h2>
                        <h1
                          className={clsx(
                            'mb-4 text-center font-intro text-2xl uppercase leading-normal tracking-tight text-white md:mb-6 md:text-4xl lg:mb-12 lg:text-[42px]'
                          )}
                        >
                          Bolaang Mongondow Selatan
                        </h1>
                      </div>
                    </div>
                  </section>
                </>
              );
            };
          },
        }}
      />
      <div className={styles.curved} />
    </>
  );
}
