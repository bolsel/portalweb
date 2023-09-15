'use client';

import UIDocumentListItem from '@/ui/dokumen/list-item';
import UIListSwrResource from '@/ui/list/swr-resource';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewsLists({
  search,
  full = false,
}: {
  search: string;
  full?: boolean;
}) {
  const router = useRouter();

  return (
    <>
      {!full && (
        <div className="min-w-0 flex flex-col md:flex-row gap-6 justify-between items-center mb-6">
          <h3 className="font-roboto text-center md:text-left font-medium text-[22px] leading-[26px] text-blue-gray-700">
            Dokumen terkait
          </h3>
          <Link href={`/pencarian/dokumen?q=${search}`} tabIndex={-1}>
            <button
              type="button"
              className="btn btn-outline btn-primary btn-sm"
            >
              Lihat Semua
            </button>
          </Link>
        </div>
      )}
      <UIListSwrResource
        view="grid"
        collection="documents"
        query={{
          limit: full ? 6 : 3,
          search,
        }}
        customizes={{
          showPagination: () => full,
        }}
        listCustomizes={{
          noViewSwitch: () => !full,
          gridClass: ({ defaults }) =>
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8',
          emptyComponent: () => (
            <section className="w-full h-full flex flex-col items-center justify-center gap-8">
              <h1 className="text-center font-lora leading-[34px] font-bold">
                Belum ada hasil pencarian untuk dokumen dengan kata kunci{' '}
                <span className="text-primary-800">{search}</span>
              </h1>
            </section>
          ),
        }}
        loadingComponent={({ view, item }) => (
          <UIDocumentListItem view={view} item={item} skeleton />
        )}
        itemComponent={({ view, item }) => (
          <UIDocumentListItem
            view={view}
            item={item}
            customizes={{
              showIcon: () => false,
              showDownload: () => false,
              itemAction: () => (item) => router.push(`/dokumen/${item.slug}`),
            }}
          />
        )}
      />
    </>
  );
}
