'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { kategoryText } from './lib';
import UIListItems, { useUIListItemsViewState } from '@/ui/list/items';
import { useModal } from '@/components/modal/provider';
import { TApiResourcePathReturn } from '@/types';
import UIDocumentItemDetail from '@/ui/dokumen/item-detail';
import BaseIcon from '@/components/icons/base-icon';
import SwrResource from '@/components/swr-resource';
import UIDocumentListItem from '@/ui/dokumen/list-item';
import UIPagination from '@/ui/pagination';

export default function Lists({ organizationId }) {
  const searchParams = useSearchParams();
  const kategori = searchParams.get('kategori');
  const [view, setView] = useUIListItemsViewState('list');
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const modal = useModal();
  useEffect(() => {
    setPage(1);
  }, [kategori]);

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
        collection="organization_documents"
        path="itemsMeta"
        query={{
          page,
          limit,
          filter: {
            organization: { id: { _eq: organizationId } },
            ...(kategori ? { category: { _eq: kategori } } : {}),
          },
        }}
        emptyComponent={() => <div>Belum ada data.</div>}
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
        {({ data }) =>
          data ? (
            <>
              <UIListItems
                view={view}
                setView={setView}
                items={data!.data}
                Component={({ item: data, view }) => (
                  <UIDocumentListItem
                    item={data}
                    view={view}
                    customizes={{
                      hideCategory: () => kategori !== null,
                      fields: ({ defaults }) => ({
                        ...defaults.fields,
                        category_name: kategoryText(data.category),
                      }),
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
          ) : (
            <div>Belum ada data.</div>
          )
        }
      </SwrResource>
    </>
  );
}
