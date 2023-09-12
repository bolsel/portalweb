'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useLayoutContext } from '../provider';
import BaseIcon from '@/components/icons/base-icon';

export default function MenuItems() {
  const layoutContext = useLayoutContext();
  const menu = layoutContext.headerCurrentMenu;
  return (
    <section className="bg-primary w-full absolute top-full left-0 border-t border-primary-400 font-menu">
      <div className="ui-container">
        <div className="flex mx-auto items-start pt-6 pb-10 bg-no-repeat">
          <div className="flex flex-col gap-8 flex-grow">
            {menu.link ? (
              <Link
                href={menu.link}
                className="text-white font-medium text-3xl leading-10"
                onClick={() => layoutContext.setHeaderCurrentMenu(null)}
              >
                {menu.title}
              </Link>
            ) : (
              <h1 className="font-menu text-white font-medium text-3xl leading-10">
                {menu.title}
              </h1>
            )}
            {menu.items && (
              <ul
                className={clsx(
                  'grid grid-cols-3 grid-rows-2 gap-y-6 gap-x-10',
                  { 'grid-flow-col': menu.items.length <= 3 }
                )}
              >
                {menu.items.map((m, index) => {
                  return (
                    <li
                      key={index}
                      className="group hover:bg-primary-700 rounded-lg hover:bg-opacity-40"
                      onClick={() => layoutContext.setHeaderCurrentMenu(null)}
                    >
                      <Link
                        href={m.link}
                        target={
                          m.link.startsWith('http') ||
                          m.link.startsWith('https')
                            ? '_blank'
                            : '_self'
                        }
                        className="flex items-start"
                        title={m.description}
                      >
                        <div className="w-2/12 mt-1.5 group-hover:transform group-hover:-scale-x-110 group-hover:scale-y-110 bg-primary-100 rounded-xl text-primary p-2">
                          <BaseIcon
                            icon={m.icon}
                            fallback="menu-default"
                            className="w-full h-full"
                          />
                        </div>
                        <div className="w-full ml-4 group-hover:border-b-primary-900 rounded-lg group-hover:bg-opacity-40">
                          <h2 className="font-menu text-lg font-bold text-gray-50 mb-1">
                            {m.title}
                          </h2>
                          <div className="text-sm text-gray-50 opacity-80 line-clamp-1">
                            {m.description}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <button
            className="ml-3 hover:bg-primary-500 hover:rounded-lg"
            title="Tutup Menu Navigasi"
            onClick={() => layoutContext.setHeaderCurrentMenu(null)}
          >
            <BaseIcon icon="close" className="text-white w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
