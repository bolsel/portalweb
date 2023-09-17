import Menu from './_Menu';
import Lists from './_Lists';
import { dataSiteMenuDokumenItems } from '@/lib/data/site';
import { SiteContextType } from '@/components/website/provider';

export default async function Page({ site }: SiteContextType) {
  const menuList = dataSiteMenuDokumenItems(site);

  return (
    <div className="p-3 md:p-4 lg:py-8 lg:px-10 w-full xl:grid xl:grid-cols-[268px,1fr] xl:grid-rows-[1fr,auto] lg:gap-6">
      <div className="mb-5 lg:mb-0">
        <div className="w-full hidden xl:block">
          <Menu menuList={menuList} />
        </div>
      </div>
      <div className="w-full max-w-none">
        <Lists organizationId={site.organization.id} />
      </div>
    </div>
  );
}
