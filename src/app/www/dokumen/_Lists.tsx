'use client';

import BaseIcon from '@/components/icons/base-icon';
import { useModal } from '@/components/modal/provider';
import UIDocumentItemDetail from '@/ui/dokumen/item-detail';
import UIDocumentListItem from '@/ui/dokumen/list-item';
import UIListSwrResource from '@/ui/list/swr-resource';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Lists() {
  const searchParams = useSearchParams();
  const currentKategoriSlug = searchParams.get('kategori') ?? '';
  const search = searchParams.get('q') ?? undefined;
  const modal = useModal();

  const showModal = (item) => {
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
              {item.category?.name}
            </span>
            <h1 className="font-heading font-medium text-[21px] leading-[34px] text-primary-700">
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
      <UIListSwrResource
        collection="documents"
        view="list"
        query={{
          search,
          filter: currentKategoriSlug
            ? { category: { slug: { _eq: currentKategoriSlug } } }
            : undefined,
        }}
        loadingComponent={({ view, item }) => (
          <UIDocumentListItem view={view} item={item} skeleton />
        )}
        itemComponent={({ view, item }) => (
          <UIDocumentListItem
            view={view}
            item={item}
            customizes={{
              hideCategory: () => currentKategoriSlug !== '',
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
