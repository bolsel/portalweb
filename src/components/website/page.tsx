import SiteProvider, { SiteContextType } from './provider';
import pages from './templates/base/pages';
import { notFound } from 'next/navigation';
import { dataSiteBySubdomain, dataSiteMenu } from '@/lib/data/site';
import Layout from './templates/base/layout';
import { templateString } from '@/lib/server';
import { ReactElement, ReactNode } from 'react';

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export default async function SitePage({
  site,
  page,
  data = {},
  menu,
}: WithOptional<SiteContextType, 'data' | 'menu' | 'site'>) {
  const { subdomain } = page.params;
  if (!site) {
    const _site = await dataSiteBySubdomain(subdomain);
    if (!_site) notFound();
    site = _site;
  }
  if (!menu) {
    menu = await dataSiteMenu(site);
  }

  const Page = pages[page.name];
  if (!Page) notFound();

  const objTemplate = {
    site,
  };
  page.title = templateString(page.title, objTemplate);
  page.subTitle = page.subTitle
    ? templateString(page.subTitle, objTemplate)
    : null;

  return (
    <>
      <SiteProvider
        value={{
          site,
          menu,
          page,
          data,
        }}
      >
        <Layout {...{ site, menu, page, data }}>
          <Page {...{ site, menu, page, data }} />
        </Layout>
      </SiteProvider>
    </>
  );
}

export function createSitePage(P: Promise<() => ReactElement>) {
  return P;
}
