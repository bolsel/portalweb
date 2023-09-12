'use client';

import BaseIcon from '@/components/icons/base-icon';
import { useModal } from '@/components/modal/provider';
import SwrResource from '@/components/swr-resource';
import { TApiResourcePathReturn } from '@/types';
import UIApplicationItemDetail from '@/ui/application/item-detail';
import UIApplicationListItem, { ItemLogo } from '@/ui/application/list-item';
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
  const showModal = (
    item: TApiResourcePathReturn<'applications'>['read']['items'][0]
  ) => {
    modal?.show(<UIApplicationItemDetail item={item} />, {
      contentClassName: ({ defaults }) =>
        clsx(defaults.contentClassName, ' max-w-[510px] lg:w-[510px]'),
      header: () => () =>
        (
          <div className="flex gap-2 w-full max-w-[550px] border-b border-b-primary-50">
            <div className="w-1/4">
              <ItemLogo
                item={item}
                className="w-full rounded-r-box bg-primary-50 group-hover:bg-primary-200 p-1 lg:p-3 flex items-center justify-center"
              />
            </div>
            <div className="flex-1 py-1">
              <span
                className="inline-block rounded-md px-[10px] py-2 text-xs font-normal text-gray-700 bg-primary-50 mb-4
      hover:text-primary-700 hover:bg-primary-100"
              >
                {item.slug}
              </span>
              <h1 className="font-roboto font-medium text-[21px] leading-[34px] text-primary-700">
                {item.title}
              </h1>
            </div>
          </div>
        ),
      footer:
        () =>
        ({ closeModal }) =>
          (
            <div className="bg-gray-50 flex gap-4 w-full items-end justify-end py-4 z-[100] mt-auto md:mt-0 px-6">
              {item.link ? (
                <Link
                  className="btn btn-primary btn-sm text-white gap-2"
                  href={item.link}
                  target="_blank"
                >
                  <BaseIcon icon="external-link" fontSize="18px" /> Buka
                  Aplikasi
                </Link>
              ) : null}
            </div>
          ),
    });
  };
  return (
    <>
      <SwrResource
        collection="applications"
        path="itemsMeta"
        query={{
          page,
          limit,
          filter: currentKategoriSlug
            ? {
                categories: {
                  category: { slug: { _eq: currentKategoriSlug } },
                },
              }
            : undefined,
        }}
        loadingComponent={() => (
          <UIListItems
            view={view}
            setView={setView}
            items={limit}
            Component={({ view }) => <UIApplicationListItem skeleton />}
          />
        )}
      >
        {({ data }) => (
          <>
            <UIListItems
              view={view}
              setView={setView}
              items={data!.data}
              Component={({ item: data, view }) => (
                <UIApplicationListItem
                  item={data}
                  onAction={(data) => showModal(data)}
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
