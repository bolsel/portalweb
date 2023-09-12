'use client';

import BaseIcon from '@/components/icons/base-icon';
import { useModal } from '@/components/modal/provider';
import SwrResource from '@/components/swr-resource';
import UIDocumentItemDetail from '@/ui/dokumen/item-detail';
import UIDocumentListItem from '@/ui/dokumen/list-item';
import UIListItems, { useUIListItemsViewState } from '@/ui/list/items';
import UIPagination from '@/ui/pagination';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Lists() {
  const searchParams = useSearchParams();
  const currentKategoriSlug = searchParams.get('kategori') ?? '';
  const [view, setView] = useUIListItemsViewState('list');
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const modal = useModal();

  useEffect(() => {
    setPage(1);
  }, [currentKategoriSlug]);
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
              {item.category.name}
            </span>
            <h1 className="font-heading font-medium text-[21px] leading-[34px] text-primary-700">
              {item.title}
            </h1>
          </section>
        ),
      footer:
        () =>
        ({ closeModal }) =>
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
      <SwrResource
        collection="documents"
        path="itemsMeta"
        query={{
          limit,
          page,
          filter: currentKategoriSlug
            ? { category: { slug: { _eq: currentKategoriSlug } } }
            : undefined,
        }}
        loadingComponent={() => (
          <UIListItems
            view={view}
            setView={setView}
            items={limit}
            Component={({ view }) => (
              <UIDocumentListItem skeleton item={{}} view={view} />
            )}
          />
        )}
      >
        {({ data }) => (
          <>
            <UIListItems
              view={view}
              setView={setView}
              items={data?.data ?? []}
              Component={({ item: data, view }) => (
                <UIDocumentListItem
                  item={data}
                  view={view}
                  customizes={{
                    hideCategory: () => currentKategoriSlug !== '',
                    itemAction: () => (item) => {
                      showModal(item);
                    },
                  }}
                />
              )}
            />
            <div className="mt-10">
              {data?.meta && (
                <UIPagination
                  total={data.meta.filter_count}
                  limit={limit}
                  page={page}
                  setLimit={setLimit}
                  setPage={setPage}
                />
              )}
            </div>
          </>
        )}
      </SwrResource>
    </>
  );
}
