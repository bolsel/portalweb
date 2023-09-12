'use client';

import {
  TWebsiteItemBySubdomain,
  TWebsiteMenu,
  TWebsitePageProps,
} from '@/types';
import { ReactNode, createContext, useContext } from 'react';

export type SiteContextType<P = {}, D = Record<string, any>> = {
  site: TWebsiteItemBySubdomain;
  menu: TWebsiteMenu[];
  page: {
    name: string;
    title: string;
    site?: TWebsiteItemBySubdomain;
    subTitle?: string;
  } & TWebsitePageProps<P>;
  data: D;
};
export const SiteContext = createContext({});

export function useSiteContext(): SiteContextType {
  return useContext(SiteContext) as SiteContextType;
}

function SiteProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: SiteContextType;
}) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
export default SiteProvider;
