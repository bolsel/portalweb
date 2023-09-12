'use client';

import MenuItems from './menu-items';
import { useLayoutContext } from '../provider';
import BaseIcon from '@/components/icons/base-icon';

const MobileMenu = () => {
  const { mobileMenuShow, setMobileMenuShow } = useLayoutContext();
  return (
    <div className="lg:hidden">
      <div className="min-w-0 flex gap-4">
        <button
          className="w-7 h-7 flex items-center justify-center"
          onClick={() => setMobileMenuShow?.(!mobileMenuShow)}
        >
          {!mobileMenuShow ? (
            <BaseIcon icon="menu" className="w-full h-full text-white" />
          ) : (
            <BaseIcon icon="close" className="w-full h-full text-white" />
          )}
          <span className="sr-only">
            {mobileMenuShow ? 'Tutup Menu' : 'Buka Menu'}
          </span>
        </button>
      </div>
    </div>
  );
};
export default function MenuList() {
  const layoutContext = useLayoutContext();
  return (
    <>
      <div className="hidden lg:flex font-menu">
        <ul className="flex items-center gap-4 text-white">
          {layoutContext.menuList.map((m, index) => (
            <li key={index}>
              <button
                className="flex items-center gap-4 cursor-pointer px-3 py-1 rounded-lg hover:bg-primary-800 hover:bg-opacity-40"
                onClick={() => layoutContext.setHeaderCurrentMenu(m)}
              >
                <span className="font-medium leading-7">{m.title}</span>
                <BaseIcon
                  icon="chevron-down"
                  className="w-5 h-5 font-bold"
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ul>
        {layoutContext.headerCurrentMenu && <MenuItems />}
      </div>
      <MobileMenu />
    </>
  );
}
