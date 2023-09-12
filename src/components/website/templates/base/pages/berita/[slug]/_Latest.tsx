'use client';

import SwrResource from '@/components/swr-resource';
import UIListItems, { useUIListItemsViewState } from '@/ui/list/items';
import UINewsListItem from '@/ui/news/list-item';
import { useState } from 'react';

export default function Latest({ webId }) {
  const [view, setView] = useUIListItemsViewState('list');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  return (
    <SwrResource
      loadingComponent={() => (
        <UIListItems
          items={limit}
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
          view={view}
          setView={setView}
          customizes={{
            noViewSwitch: () => true,
          }}
        />
      )}
      collection="web_news"
      path="items"
      query={{
        filter: {
          website: { _eq: webId },
        },
        limit,
        page,
      }}
    >
      {({ data }) => {
        return (
          <>
            <UIListItems
              items={data ?? []}
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
              customizes={{
                noViewSwitch: () => true,
              }}
            />
          </>
        );
      }}
    </SwrResource>
  );
}
