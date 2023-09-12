import { TWebsiteGenMetaProps } from '@/types';
import { Metadata } from 'next';
import { dataSiteBySubdomain } from '../data/site';
import { notFound } from 'next/navigation';

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
export async function generateMetadataBeritaSlug() {}
