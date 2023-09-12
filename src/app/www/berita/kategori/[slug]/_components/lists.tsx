'use client';

import DeviceDetect from '@/components/device-detect';
import SwrResource from '@/components/swr-resource';
import UIListItems, { useUIListItemsViewState } from '@/ui/list/items';
import UINewsListItem from '@/ui/news/list-item';
import UIPagination from '@/ui/pagination';
import { useState } from 'react';

export default function Lists({ category }: { category?: string }) {
  const [view, setView] = useUIListItemsViewState('list');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  return (
    <DeviceDetect>
      {({ isMobile }) => (
        <SwrResource
          collection="news"
          path={'itemsMeta'}
          query={{
            limit,
            page,
            filter: category
              ? { category: { slug: { _eq: category } } }
              : undefined,
          }}
          loadingComponent={() => (
            <UIListItems
              items={limit}
              Component={({ item: data, view }) => (
                <UINewsListItem skeleton item={[]} view={view} />
              )}
              view={isMobile ? 'grid' : view}
              setView={setView}
            />
          )}
        >
          {({ data }) => {
            return (
              <>
                <UIListItems
                  items={data?.data ?? []}
                  Component={({ item: data, view }) => (
                    <UINewsListItem item={data} view={view} />
                  )}
                  view={isMobile ? 'grid' : view}
                  setView={setView}
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
            );
          }}
        </SwrResource>
      )}
    </DeviceDetect>
  );
}
