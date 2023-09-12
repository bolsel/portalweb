'use client';

import SwrResource from '@/components/swr-resource';
import UIGrafikInfoWidgetList from '@/ui/grafik-info/widget-list';
import clsx from 'clsx';

export default function GrafikInfoList() {
  return (
    <>
      <SwrResource
        collection="grafik_info"
        path="items"
        query={{
          limit: 3,
        }}
        loadingComponent={() => (
          <UIGrafikInfoWidgetList
            skeleton
            swiper={{ className: 'py-5 pt-5' }}
            slideContainer={{
              className: clsx(
                `!bg-cover !bg-center`,
                '!w-[300px] !h-[500px] lg:!w-full'
              ),
            }}
          />
        )}
      >
        {({ data }) => (
          <UIGrafikInfoWidgetList
            items={data ?? []}
            swiper={{ className: 'py-0 pt-0' }}
            slideContainer={{
              className: clsx(
                `!bg-cover !bg-center`,
                '!w-[300px] !h-[500px] lg:!w-full'
              ),
            }}
          />
        )}
      </SwrResource>
    </>
  );
}
