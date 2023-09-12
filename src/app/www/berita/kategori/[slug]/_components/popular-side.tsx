'use client';

import SwrResource from '@/components/swr-resource';
import UIListItems, { useUIListItemsViewState } from '@/ui/list/items';
import UINewsListItem from '@/ui/news/list-item';

export default function PopulerSide({ category }) {
  const [view, setView] = useUIListItemsViewState('list');
  return (
    <div className="w-full flex flex-col gap-2 lg:gap-4 ">
      <div className="flex w-full h-[38px] mb-6">
        <div className="border-b-[3px] border-primary">
          <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
            Berita Populer
          </h1>
        </div>
        <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
      </div>
      <SwrResource
        collection="news"
        path="items"
        query={{
          limit: 5,
          sort: '-view_count',
          filter: category
            ? { category: { slug: { _eq: category } } }
            : undefined,
        }}
        loadingComponent={() => (
          <UIListItems
            items={5}
            customizes={{
              noViewSwitch: () => true,
            }}
            Component={({ item: data, view }) => (
              <UINewsListItem
                skeleton
                item={[]}
                view={view}
                customizes={{
                  small: () => true,
                }}
              />
            )}
            view={'list'}
            setView={setView}
          />
        )}
      >
        {({ data }) => {
          return (
            <UIListItems
              items={data ?? []}
              customizes={{
                noViewSwitch: () => true,
              }}
              Component={({ item: data, view }) => (
                <UINewsListItem
                  item={data}
                  view={view}
                  customizes={{
                    small: () => true,
                    fields: ({ defaults }) => ({
                      ...defaults.fields,
                      description: '',
                    }),
                  }}
                />
              )}
              view={view}
              setView={setView}
            />
          );
        }}
      </SwrResource>
    </div>
  );
}
