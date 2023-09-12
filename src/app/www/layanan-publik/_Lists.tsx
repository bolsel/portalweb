'use client';

import BaseIcon from '@/components/icons/base-icon';
import SwrResource from '@/components/swr-resource';
import UIListItems, { useUIListItemsViewState } from '@/ui/list/items';
import UIPagination from '@/ui/pagination';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Lists() {
  const [view, setView] = useUIListItemsViewState('list');
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const LogoComponent = ({ data, className }) => (
    <div className={`${className}`}>
      {data.logo ? (
        <Image
          src={data.logo.url}
          width={100}
          height={100}
          alt={`Logo ${data.slug}`}
          className="w-full"
        />
      ) : (
        <BaseIcon
          icon="layanan-publik"
          className="text-primary"
          width={48}
          height={48}
        />
      )}
    </div>
  );
  return (
    <>
      <SwrResource
        collection="public_services"
        path="itemsMeta"
        query={{ page, limit }}
        loadingComponent={() => (
          <UIListItems
            view={view}
            setView={setView}
            items={limit}
            Component={() => (
              <div className="grid grid-cols-1 md:grid-cols-[60px,1fr] min-w-0 w-full min-h-[228px] md:min-h-[200px] p-4 gap-4 border border-gray-100 rounded-xl">
                <div className="w-12 h-12 md:w-[60px] md:h-[60px] bg-gray-200 animate-pulse rounded-md" />
                <div>
                  <div className="inline-block rounded-md h-[32px] w-[100px] bg-gray-200 animate-pulse mb-4" />
                  <div className="rounded-sm h-6 w-10/12 bg-gray-200 animate-pulse md:mb-2" />
                  <div className="hidden md:block rounded-sm h-4 w-full bg-gray-200 animate-pulse md:mb-2" />
                </div>
                <div className="grid h-[fit-content] grid-cols-2 gap-4 md:col-start-2 md:flex">
                  <div className="h-[36px] w-full md:w-[100px] bg-gray-200 animate-pulse rounded-md" />
                  <div className="h-[36px] w-full md:w-[100px] bg-gray-200 animate-pulse rounded-md" />
                </div>
              </div>
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
              Component={({ item, view }) => (
                <Link
                  href={`/layanan-publik/${item.slug}`}
                  className="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none
min-w-full rounded-xl flex border border-primary-50
p-4 w-full cursor-pointer group hover:bg-primary-50"
                >
                  <div className="flex gap-2 items-start h-full">
                    <LogoComponent
                      data={item}
                      className="rounded-box bg-gray-100 group-hover:bg-primary-200 p-1 lg:p-3 w-[50px] md:w-[70px] lg:w-[100px] flex items-center justify-center"
                    />
                    <div className="">
                      <div className="font-lato font-bold text-sm text-blue-gray-800 leading-1 md:text-base">
                        {item.title}
                      </div>

                      {item.type?.length ? (
                        <div className="flex gap-2 mb-2">
                          {item.type?.map((t, i) => (
                            <span
                              key={i}
                              className="inline-block rounded-md px-2 py-1 text-xs font-semibold text-gray-700 bg-primary-50
group-hover:text-primary-700 group-hover:bg-primary-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <p className="w-4/4 font-lato text-sm font-normal text-[#415C84] leading-5 line-clamp-3 md:line-clamp-2 mt-3 mb-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
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
