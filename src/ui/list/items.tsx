'use client';

import clsx from 'clsx';
import { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';
import { IUICreateCustomizableDefine, UICreateCustomizable } from '../create';
import BaseIcon, { BaseIconNamesType } from '@/components/icons/base-icon';
import { UIListViewType } from '@/types';

export function useUIListItemsViewState(view: UIListViewType) {
  return useState<UIListViewType>(view);
}

export type UIListItemsType<
  Item extends Record<string, any> = Record<string, any>
> = IUICreateCustomizableDefine<
  {
    items: number | Item[];
    Component: FC<{ item: Item; view: UIListViewType }>;
    view: UIListViewType;
    setView: Dispatch<SetStateAction<UIListViewType>>;
  },
  {
    listClass: string;
    gridClass: string;
    switchView: ReactNode;
    listIconName: BaseIconNamesType;
    gridIconName: BaseIconNamesType;
    noViewSwitch: boolean;
    emptyComponent: ReactNode;
  }
>;

export default function UIListItems<I extends Record<string, any>>(
  props: UIListItemsType<I>['props']
) {
  return UICreateCustomizable<UIListItemsType<I>>({
    props,
    defaults: {
      noViewSwitch: () => false,
      listClass: () => 'flex flex-col gap-6',
      gridClass: () => 'grid grid-cols-1 lg:grid-cols-2 gap-4',
      listIconName: () => 'view-list',
      gridIconName: () => 'view-grid',
      emptyComponent: () => <div>Belum ada data</div>,
      switchView: ({ view, setView, render }) => {
        if (render('noViewSwitch')) return null;
        return (
          <div className="hidden lg:flex min-w-0 gap-4 justify-end divide-x divide-gray-400">
            <div className="flex gap-4 items-center mb-3">
              <p className="font-lato font-normal text-sm leading-6 text-blue-gray-500 whitespace-nowrap">
                Tampilan :
              </p>
              <button
                className="w-6 h-6 flex items-center justify-center"
                title="Tampilan List"
                aria-label="Tampilan List"
                onClick={() => setView('list')}
              >
                <BaseIcon
                  icon={render('listIconName')}
                  className={clsx('w-full h-full', {
                    'filter grayscale opacity-30': view !== 'list',
                  })}
                />
              </button>
              <button
                className="w-6 h-6 flex items-center justify-center"
                title="Tampilan Grid"
                aria-label="Tampilan Grid"
                onClick={() => setView('grid')}
              >
                <BaseIcon
                  icon={render('gridIconName')}
                  className={clsx('w-full h-full', {
                    'filter grayscale opacity-30': view !== 'grid',
                  })}
                />
              </button>
            </div>
          </div>
        );
      },
    },
    Component: ({ Render, Component, items, render, view }) => {
      const _items = typeof items === 'number' ? [...Array(items)] : items;
      if (!_items.length) {
        return render('emptyComponent');
      }
      return (
        <>
          {render('switchView')}
          <div
            className={clsx(
              'ui-base-list-items',
              view === 'grid' ? render('gridClass') : render('listClass')
            )}
          >
            {_items.map((item, index) => {
              return Component ? (
                <Component key={index} view={view} item={item} />
              ) : null;
            })}
          </div>
        </>
      );
    },
  });
}
