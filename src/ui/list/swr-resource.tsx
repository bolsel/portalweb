'use client';

import { useEffect, useState } from 'react';
import { IUICreateCustomizableDefine, UICreateCustomizable } from '../create';
import {
  TApiResourceItemsListKeys,
  TApiResourcePathReturn,
  UIListViewType,
} from '@/types';
import SwrResource from '@/components/swr-resource';
import UIListItems, {
  UIListItemsType,
  useUIListItemsViewState,
} from '../list/items';
import UIPagination from '../pagination';
import { ApiSwrQueryProps } from '@/lib/hooks/use-api-resource-swr';

type _Item<C extends TApiResourceItemsListKeys> =
  TApiResourcePathReturn<C>['read']['items'][0];

export type UIDocumentListsSwrType<C extends TApiResourceItemsListKeys> =
  IUICreateCustomizableDefine<
    {
      collection: C;
      view: UIListViewType;
      listCustomizes?: UIListItemsType<_Item<C>>['customizesProps'];
      loadingComponent: UIListItemsType<_Item<C>>['props']['Component'];
      itemComponent: UIListItemsType<_Item<C>>['props']['Component'];
      query?: ApiSwrQueryProps<C>;
    },
    {
      showPagination: boolean;
    }
  >;

const UIListSwrResource = <C extends TApiResourceItemsListKeys>(
  props: UIDocumentListsSwrType<C>['props']
) => {
  return UICreateCustomizable<UIDocumentListsSwrType<C>>({
    props,
    defaults: {
      showPagination: () => true,
    },
    Component({
      render,
      loadingComponent,
      itemComponent,
      query,
      collection,
      listCustomizes,
      view: _view,
    }) {
      const [view, setView] = useUIListItemsViewState(_view);
      const [limit, setLimit] = useState(query?.limit ?? 6);
      const [page, setPage] = useState(query?.page ?? 1);

      useEffect(() => {
        setPage(1);
      }, [query]);

      return (
        <SwrResource
          collection={collection}
          path="itemsMeta"
          query={{
            ...query,
            limit,
            page,
          }}
          loadingComponent={() => (
            <UIListItems
              view={view}
              setView={setView}
              items={limit}
              customizes={listCustomizes}
              Component={loadingComponent}
            />
          )}
        >
          {({ data }) => (
            <>
              <UIListItems
                view={view}
                setView={setView}
                // @ts-ignore
                items={data?.data ?? []}
                // @ts-ignore
                customizes={listCustomizes}
                // @ts-ignore
                Component={itemComponent}
              />
              <div className="mt-10">
                {render('showPagination') && data?.data.length && data?.meta ? (
                  <UIPagination
                    total={data.meta.filter_count}
                    limit={limit}
                    page={page}
                    setLimit={setLimit}
                    setPage={setPage}
                  />
                ) : null}
              </div>
            </>
          )}
        </SwrResource>
      );
    },
  });
};
export default UIListSwrResource;
