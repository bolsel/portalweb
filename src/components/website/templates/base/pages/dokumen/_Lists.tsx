'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { kategoryText } from './lib';
import { useModal } from '@/components/modal/provider';
import { TApiResourcePathReturn } from '@/types';
import UIDocumentItemDetail from '@/ui/dokumen/item-detail';
import BaseIcon from '@/components/icons/base-icon';
import UIDocumentListItem from '@/ui/dokumen/list-item';
import SearchInput from '@/components/input/search-input';
import UIListSwrResource from '@/ui/list/swr-resource';

export default function Lists({ organizationId }) {
  const searchParams = useSearchParams();
  const kategori = searchParams.get('kategori') ?? '';
  const search = searchParams.get('q') ?? undefined;
  const modal = useModal();
  const router = useRouter();

  const showModal = (
    item: TApiResourcePathReturn<'organization_documents'>['read']['items'][0]
  ) => {
    modal?.show(<UIDocumentItemDetail item={item} />, {
      contentClassName: ({ defaults }) =>
        clsx(defaults.contentClassName, ' max-w-[510px] lg:w-[510px]'),
      header: () => () =>
        (
          <section className="p-6 pb-0 w-full">
            <span
              className="inline-block rounded-md px-[10px] py-2 text-xs font-normal text-gray-700 bg-gray-100 mb-4
hover:text-primary-700 hover:bg-primary-100"
            >
              {item.category}
            </span>
            <h1 className="font-content-title font-medium text-[21px] leading-[34px] text-primary-700">
              {item.title}
            </h1>
          </section>
        ),
      footer: () => () =>
        (
          <div className="bg-gray-50 flex gap-4 w-full items-end justify-end py-4 z-[100] mt-auto md:mt-0 px-6">
            <Link
              className="btn btn-primary btn-sm text-white gap-2"
              href={item.file.url}
              target="_blank"
              download
            >
              <BaseIcon icon="download" fontSize="18px" /> Unduh
            </Link>

            <Link
              className="btn btn-primary btn-sm text-white gap-2"
              href={`/dokumen/${item.slug}`}
            >
              <BaseIcon icon="eye" fontSize="18px" /> Lihat
            </Link>
          </div>
        ),
    });
  };
  return (
    <>
      <div className="mb-2">
        <SearchInput
          placeholder="Cari dokumen"
          currentValue={search}
          onClear={() =>
            router.push(`/dokumen${kategori ? `?kategori=${kategori}` : ''}`)
          }
          onSubmit={(value) =>
            kategori
              ? router.push(`/dokumen?kategori=${kategori}&q=${value}`)
              : router.push(`/dokumen?q=${value}`)
          }
        />
      </div>

      <UIListSwrResource
        collection="organization_documents"
        view="list"
        query={{
          search,
          filter: {
            organization: { id: { _eq: organizationId } },
            ...(kategori ? { category: { _eq: kategori } } : {}),
          },
        }}
        loadingComponent={({ view, item }) => (
          <UIDocumentListItem view={view} item={item} skeleton />
        )}
        itemComponent={({ view, item }) => (
          <UIDocumentListItem
            view={view}
            item={item}
            customizes={{
              fields: ({ defaults }) => ({
                ...defaults.fields,
                category_name: kategoryText(item.category),
              }),
              hideCategory: () => kategori !== '',
              itemAction: () => (item) => {
                showModal(item);
              },
            }}
          />
        )}
      />
    </>
  );
}
