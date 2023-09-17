import ContentBlocks from '@/components/content-blocks';
import BaseIcon from '@/components/icons/base-icon';
import { SiteContextType } from '@/components/website/provider';
import { dataSiteMenuProfilItems } from '@/lib/data/site';
import { apiResourceItemPathRead } from '@/lib/server';
import clsx from 'clsx';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Pejabat from './_Pejabat';

export default async function Page({
  site,
  page,
}: SiteContextType<{ slug: string }>) {
  const { slug } = page.params;
  const orgInfo = await apiResourceItemPathRead('organizations')
    .infoBySlug({
      paths: [site.organization.slug],
    })
    .catch(() => null);
  if (!orgInfo) notFound();

  const menuList = dataSiteMenuProfilItems(site);
  const menu = menuList?.find((m) => m.link === `/profil/${slug}`);
  if (!menu) notFound();

  const RenderContent = () => {
    if (slug === 'visi-misi') {
      return (
        <div className="prose max-w-none">
          <h2>Visi</h2>
          <ContentBlocks {...orgInfo.visi} />
          <h2>Misi</h2>
          <ContentBlocks {...orgInfo.misi} />
        </div>
      );
    } else if (slug === 'sekilas') {
      return (
        <ContentBlocks {...orgInfo['sekilas']} className="prose max-w-none" />
      );
    } else if (slug === 'struktur-organisasi') {
      return (
        <ContentBlocks {...orgInfo['structure']} className="prose max-w-none" />
      );
    } else if (slug === 'pejabat') {
      return <Pejabat organizationId={site.organization.id} />;
    }
    return <div>Belum ada data.</div>;
  };
  return (
    <div className="p-3 md:p-4 lg:py-8 lg:px-10 w-full xl:grid xl:grid-cols-[268px,1fr] xl:grid-rows-[1fr,auto] lg:gap-6">
      <div className="mb-5 lg:mb-0">
        <div className="w-full hidden xl:block">
          <ul
            tabIndex={0}
            className="w-full menu bg-base-100  p-2 rounded-box shadow-md border-primary border-1 gap-1"
          >
            {menuList?.map((m, i) => {
              return (
                <li key={i}>
                  <Link
                    href={m.link}
                    className={clsx({ active: m.link === `/profil/${slug}` })}
                  >
                    <BaseIcon
                      className="w-5 h-5"
                      icon={m.icon}
                      fallback="menu-default"
                    />
                    {m.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="w-full max-w-none">
        <RenderContent />
      </div>
    </div>
  );
}
