'use client';

import Link from 'next/link';
import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useLayoutContext } from '../provider';
import BaseIcon from '@/components/icons/base-icon';

export default function HeaderMobile() {
  const layoutContext = useLayoutContext();
  const [active, setActive] = useState<number | null>(null);

  return (
    <Transition
      as={Fragment}
      show={layoutContext.mobileMenuShow}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="overflow-y-scroll overscroll-none top-12 sm:top-16 left-0 right-0 bottom-0 fixed bg-primary z-50 border-t border-primary-500 lg:hidden ">
        <div className="ui-container h-full mb-1">
          <div className="py-4 w-full h-full flex flex-col">
            <section className="min-w-0 flex flex-col">
              {layoutContext.menuList.map((m, i) => (
                <div
                  key={i}
                  className="navigation__sidebar__menu py-4 text-white transition-all ease-in duration-150"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => {
                      setActive(null);
                      if (active !== i) {
                        setActive(i);
                      }
                    }}
                  >
                    <h3>{m.title}</h3>
                    <div className="navigation__sidebar__button h-6 w-6 flex items-center justify-center rounded-full hover:bg-primary-600">
                      <BaseIcon
                        icon={active === i ? 'chevron-up' : 'chevron-down'}
                        fill="white"
                        className="w-8 h-8 cursor-pointer transition-transform ease-in"
                      />
                    </div>
                  </div>
                  <Transition
                    show={active === i}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ul className="flex flex-col mt-3 gap-6 pl-6 py-3 border-l-2 border-primary-500">
                      {m.items &&
                        m.items.map((sm, smI) => {
                          return (
                            <li key={smI}>
                              <Link
                                href={sm.link}
                                className="text-sm font-normal leading-6 flex justify-center items-center gap-3"
                                target={
                                  sm.link.startsWith('http') ||
                                  sm.link.startsWith('https')
                                    ? '_blank'
                                    : '_self'
                                }
                              >
                                <div className=" w-8 h-8">
                                  <BaseIcon
                                    icon={sm.icon}
                                    fallback="menu-default"
                                    className="text-white text-opacity-50 w-8 h-8"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div>{sm.title}</div>
                                  <div className="text-xs line-clamp-1 text-white text-opacity-75">
                                    {sm.description}
                                  </div>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </Transition>
                </div>
              ))}
            </section>
            <section className="mt-auto pt-4 border-t border-primary-500">
              <p className="font-lato text-sm font-normal leading-6 text-white text-center">
                Copyright © 2023 <br /> Pemerintah Kabupaten Bolaang Mongondow
                Selatan
              </p>
            </section>
          </div>
        </div>
      </div>
    </Transition>
  );
}
