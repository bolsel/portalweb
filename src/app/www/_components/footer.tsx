'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useLayoutContext } from '../provider';
import BaseIcon from '@/components/icons/base-icon';

function Info() {
  const layoutContext = useLayoutContext();
  const settings = layoutContext.settings;

  return (
    <div className="min-w-0 grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between gap-6 text-white">
      <div className="flex items-start gap-3">
        <BaseIcon icon="map-pin" className="py-1 w-8 h-8" />
        <div className="flex flex-col gap-1">
          <p className="font-roboto font-bold leading-7">
            Kompleks Perkantoran Panango
          </p>
          <div className="flex flex-col text-sm leading-6">
            <p>
              {settings.address ??
                'Jalan Ir. Soekarno, Tabilaa, Kec. Bolaang Uki'}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <BaseIcon icon="mail" className="py-1 w-8 h-8" />
        <div className="flex flex-col gap-1">
          <p className="font-roboto font-bold leading-7">Surel</p>
          <a href="mailto:info@bolselkab.go.id" className="text-sm leading-6">
            {settings.email ?? 'info@bolselkab.go.id'}
          </a>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <BaseIcon icon="tabler-social" className="py-1 w-8 h-8" />
        <div className="flex flex-col gap-1">
          <p className="font-bold">Media Sosial</p>
          <div className="w-full flex justify-between md:justify-start gap-6">
            {settings.link_facebook ? (
              <a
                href={settings.link_facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="hover:bg-[#1877F2] p-2 flex justify-center items-center rounded-md border border-white border-opacity-20"
              >
                <BaseIcon icon="facebook" className="w-6 h-6" />
              </a>
            ) : null}
            {settings.link_twitter ? (
              <a
                href={settings.link_twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="hover:bg-[#1DA1F2] p-2 flex justify-center items-center rounded-md border border-white border-opacity-20"
              >
                <BaseIcon icon="twitter" className="w-6 h-6" />
              </a>
            ) : null}
            {settings.link_instagram ? (
              <a
                href={settings.link_instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:bg-[#E4405F] p-2 flex justify-center items-center rounded-md border border-white border-opacity-20"
              >
                <BaseIcon icon="instagram" className="w-6 h-6" />
              </a>
            ) : null}
            {settings.link_youtube ? (
              <a
                href={settings.link_youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="Youtube"
                className="hover:bg-[#CD201F] p-2 flex justify-center items-center rounded-md border border-white border-opacity-20"
              >
                <BaseIcon icon="youtube" className="w-6 h-6" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const layoutContext = useLayoutContext();
  return (
    <footer className="bg-primary relative">
      <div className="ui-container">
        <div className="py-6 md:py-12 flex flex-col gap-6 md:gap-12 bg-no-repeat">
          <Link href="/" className="w-[fit-content]">
            <div className="flex flex-col">
              <span className="font-intro text-white text-lg lg:text-xl">
                bolselkab.go.id
              </span>
            </div>
          </Link>
          <Info />
          <div className="flex w-full flex-col text-white">
            <div className="flex items-start gap-3">
              <BaseIcon icon="sitemap" className="py-1 w-8 h-8" />
              <div className="flex w-full min-h-0 flex-col gap-4">
                <h2 className="font-roboto font-bold leading-7">Sitemap</h2>
                <section className="min-w-0 flex flex-col divide-y divide-primary-400 -mt-4 lg:hidden">
                  {layoutContext.menuList.map((m, i) => (
                    <details key={i} className="py-4">
                      <summary className="flex justify-between items-center">
                        <h3 className="font-bold">{m.title}</h3>
                        <div className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-primary-600">
                          <BaseIcon
                            icon="chevron-down"
                            fill="white"
                            className="w-8 h-8 cursor-pointer transition-transform ease-in duration-150"
                          />
                        </div>
                      </summary>
                      <ul className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-2">
                        {m.items &&
                          m.items.map((sm, smI) => {
                            return (
                              <li key={smI}>
                                <Link
                                  href={sm.link}
                                  className="text-sm font-normal leading-6 block"
                                  target={
                                    sm.link.startsWith('http') ||
                                    sm.link.startsWith('https')
                                      ? '_blank'
                                      : '_self'
                                  }
                                >
                                  {sm.title}
                                </Link>
                              </li>
                            );
                          })}
                      </ul>
                    </details>
                  ))}
                </section>
                <section
                  className={clsx(
                    `min-w-0 w-full hidden justify-between lg:grid`,
                    {
                      'lg:grid-cols-2': layoutContext.menuList.length === 2,
                      'lg:grid-cols-3': layoutContext.menuList.length === 3,
                      'lg:grid-cols-4': layoutContext.menuList.length === 4,
                      'lg:grid-cols-5': layoutContext.menuList.length === 5,
                    },
                    `lg:grid lg:gap-y-8 lg:-ml-7`
                  )}
                >
                  {layoutContext.menuList.map((m, i) => {
                    return (
                      <div
                        key={i}
                        className="px-7 border-r border-primary-500 last-of-type:border-transparent"
                      >
                        <h3 className="font-roboto text-base leading-6 font-bold mb-2 whitespace-nowrap">
                          {m.title}
                        </h3>
                        <ul className="grid grid-flow-row gap-x-8 gap-y-2">
                          {m.items &&
                            m.items.map((sm, smI) => {
                              return (
                                <li key={smI} className="min-w-[95px]">
                                  <Link
                                    href={sm.link}
                                    className="text-sm font-normal leading-6 link-hover"
                                    target={
                                      sm.link.startsWith('http') ||
                                      sm.link.startsWith('https')
                                        ? '_blank'
                                        : '_self'
                                    }
                                  >
                                    {sm.title}
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    );
                  })}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-4 lg:py-6 border-t border-primary-500">
        <div className="ui-container">
          <div className="flex flex-col items-center lg:items-start gap-5">
            <p className="font-lato text-xs lg:text-sm font-normal leading-6 text-white text-center lg:text-left">
              Copyright © 2024 <br className="lg:hidden" /> Pemerintah Kabupaten
              Bolaang Mongondow Selatan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
