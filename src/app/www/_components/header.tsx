'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLayoutContext } from '../provider';
import MenuList from './menu-list';
import HeaderMobile from './header-mobile';
import Image from 'next/image';

export default function Header() {
  const layoutContext = useLayoutContext();
  const [windowScrollY, setWindowScrollY] = useState(0);
  const onScroll = useCallback(() => {
    const { scrollY } = window;
    setWindowScrollY(scrollY);
  }, []);
  useEffect(() => {
    //add eventlistener to window
    window.addEventListener('scroll', onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });
  const pathName = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    layoutContext.setHeaderCurrentMenu(null);
    layoutContext.setMobileMenuShow(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName, searchParams]);

  return (
    <header
      className={clsx({
        'bg-primary': windowScrollY > 600 || layoutContext.headerCurrentMenu,
      })}
    >
      <div className="ui-container">
        <nav className="flex items-center">
          <Link
            href="/"
            className="mr-auto w-auto h-8 lg:h-[38px] flex gap-3 items-center"
            aria-label="Beranda"
          >
            <Image
              className="w-auto h-full"
              alt="Beranda"
              src={'/logo.png'}
              width={50}
              height={50}
            />
            <div className="flex flex-col">
              <span className="font-intro text-white text-lg lg:text-xl">
                bolselkab.go.id
              </span>
            </div>
          </Link>
          <MenuList />
          <HeaderMobile />
        </nav>
      </div>
    </header>
  );
}
