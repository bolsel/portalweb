'use client';

import SwrResource from '@/components/swr-resource';
import UIGrafikInfoWidgetList from '@/ui/grafik-info/widget-list';

export default function Lists() {
  return (
    <SwrResource
      collection="grafik_info"
      path="items"
      query={{
        limit: -1,
      }}
      loadingComponent={() => <UIGrafikInfoWidgetList skeleton />}
    >
      {({ data }) => (
        <UIGrafikInfoWidgetList
          customizes={{ showAllButton: () => false }}
          items={data ?? []}
        />
      )}
    </SwrResource>
  );
}
