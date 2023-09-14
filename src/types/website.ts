import { BaseIconNamesType } from '@/components/icons/base-icon';
import { ReactNode } from 'react';
import { TApiResourcePathReturn } from './resource';

export type TWebsiteItemBySubdomain =
  TApiResourcePathReturn<'websites'>['read']['bySubdomain'];

export type TWebsiteParams<P = {}> = { subdomain: string } & P;

export type TWebsitePageProps<P = {}> = {
  params: TWebsiteParams<P>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export type TWebsitePagePropsWithChildren<P = {}> = TWebsitePageProps<P> & {
  children: ReactNode;
};

export type TWebsiteGenMetaProps = Omit<TWebsitePageProps, 'children'>;

export type TWebsiteMenu = {
  title: string;
  link: string;
  items?: (TWebsiteMenu & { description: string; icon: BaseIconNamesType })[];
};
