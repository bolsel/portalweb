import { SiteContextType } from '@/components/website/provider';
import UIDocumentItemDetail from '@/ui/dokumen/item-detail';
import { TDocumentItem } from '@/types';
import UIDocumentItemFrame from '@/ui/dokumen/item-frame';

export default async function Page({
  data: { item },
}: SiteContextType<{ slug: string }, { item: TDocumentItem }>) {
  return (
    <div className="p-3 md:p-4 lg:py-8 lg:px-10 rounded-xl w-full xl:grid xl:grid-cols-[1fr,360px] xl:grid-rows-[auto,1fr] lg:gap-6">
      <UIDocumentItemFrame item={item} />

      <div className="">
        <div className="flex flex-col gap-7 lg:sticky lg:top-[88px]">
          <UIDocumentItemDetail
            item={item}
            customizes={{
              descriptionScroll: () => false,
              showDownloadLink: () => true,
            }}
          />
        </div>
      </div>
    </div>
  );
}
