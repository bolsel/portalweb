'use client';

import DeviceDetect from '@/components/device-detect/device';
import SwrResource from '@/components/swr-resource';
import { useSiteContext } from '@/components/website/provider';
import UIListItems, { useUIListItemsViewState } from '@/ui/list/items';
import UINewsListItem from '@/ui/news/list-item';
import UIPagination from '@/ui/pagination';
import { useState } from 'react';

export default function SiteNewsListsSwr() {
  const [view, setView] = useUIListItemsViewState('grid');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const siteLayoutContext = useSiteContext();
  return (
    <DeviceDetect>
      {({ isMobile }) => (
        <SwrResource
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
          collection="web_news"
          path="itemsMeta"
          query={{
            filter: {
              website: { _eq: siteLayoutContext.site.id },
            },
            limit,
            page,
          }}
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
