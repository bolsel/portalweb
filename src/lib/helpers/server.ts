import { TWebsiteGenMetaProps } from '@/types';
import { Metadata } from 'next';
import { dataSiteBySubdomain } from '../data/site';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { LOCALDEV_DOMAIN, ROOT_DOMAIN } from '@/init';

export function currentReqSubdomain() {
  const headerList = headers();
  return headerList
    .get('host')
    ?.replace(`.${LOCALDEV_DOMAIN}`, '')
    ?.replace(`.${ROOT_DOMAIN}`, '');
}

export async function genMetaSiteIndex({
  params: { subdomain },
}: TWebsiteGenMetaProps): Promise<Metadata> {
  const site = await dataSiteBySubdomain(subdomain);
  if (!site) notFound();

  return {
    title: site.name,
    description: site.organization.name,
  };
}
