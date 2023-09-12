'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

export type LayoutContextType = {
  menuList: Record<string, any>[];
  settings: Record<string, any>;
  headerCurrentMenu: any;
  setHeaderCurrentMenu: any;
  mobileMenuShow: boolean;
  setMobileMenuShow: any;
};
export const LayoutContext = createContext<LayoutContextType>({
  menuList: [],
  settings: {},
  headerCurrentMenu: null,
  setHeaderCurrentMenu: null,
  mobileMenuShow: false,
  setMobileMenuShow: null,
});

export function useLayoutContext() {
  return useContext(LayoutContext);
}

export function Provider({
  children,
  value,
}: {
  children: ReactNode;
  value: Pick<LayoutContextType, 'menuList' | 'settings'>;
}) {
  const [headerCurrentMenu, setHeaderCurrentMenu] = useState(null);
  const [mobileMenuShow, setMobileMenuShow] = useState(false);

  return (
    <LayoutContext.Provider
      value={{
        ...value,
        headerCurrentMenu,
        setHeaderCurrentMenu,
        mobileMenuShow,
        setMobileMenuShow,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
