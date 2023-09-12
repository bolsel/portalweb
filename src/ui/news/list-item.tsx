import clsx from 'clsx';
import Link from 'next/link';

import Image from 'next/image';
import { IUICreateCustomizableDefine, UICreateCustomizable } from '../create';
import { UIListViewType } from '@/types';
import BaseIcon from '@/components/icons/base-icon';

export type UINewsListItemType<Item extends Record<string, any>> =
  IUICreateCustomizableDefine<
    {
      skeleton?: boolean;
      item: Item;
      view: UIListViewType;
    },
    {
      small: boolean;
      linkRead: string;
      targetBlank: boolean;
      fields: {
        title: string;
        slug: string;
        category_name: string;
        description: string;
        cover_image_url: string;
        publish_date: string;
      };
    }
  >;
const UINewsListItem = <Item extends Record<string, any>>(
  props: UINewsListItemType<Item>['props']
) => {
  return UICreateCustomizable<UINewsListItemType<Item>>({
    props,
    defaults: {
      small: () => false,
      linkRead: ({ render }) => `/berita/${render('fields').slug}`,
      targetBlank: () => false,
      fields: ({ item }) => ({
        title: item.title,
        slug: item.slug,
        category_name: item.category_name,
        description: item.description,
        cover_image_url: item.image_cover?.url,
        publish_date: item.publish_date_format ?? item.publish_date,
      }),
    },
    Component({ item, view, render, skeleton }) {
      if (skeleton) {
        return (
          <div
            className={clsx(
              'search-item min-w-0 w-full group rounded-xl border border-transparent',
              'transition-all duration-150 ease-out hover:border-gray-100 hover:shadow-sm',
              view === 'grid'
                ? 'flex flex-col min-h-[200px]'
                : 'flex gap-4 min-h-[88px]'
            )}
          >
            <div
              className={clsx(
                view === 'list'
                  ? 'flex-shrink-0 w-[72px] h-[72px] md:w-[200px] md:h-[130px] overflow-hidden rounded-lg transition-transform duration-300 ease-in-out'
                  : 'w-full h-[120px] mb-2 self-start rounded-lg overflow-hidden flex items-center justify-center bg-gray-100',

                { '!w-[72px] !h-[72px]': view === 'list' && render('small') },
                'bg-gray-200 animate-pulse'
              )}
            >
              <div className=" flex items-center justify-center w-full h-full transition-transform object-center object-cover duration-300 ease-in-out">
                <BaseIcon icon="image" className="text-gray-300 w-10 h-10" />
              </div>
            </div>
            <div className="w-full flex flex-col items-start justify-center">
              <div className="w-full">
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-md mb-1" />
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-md mb-1" />
                <div className="w-3/4 h-3 bg-gray-200 animate-pulse rounded-md mb-1" />
                <div className="w-1/2 h-3 bg-gray-200 animate-pulse rounded-md mb-3" />
                <div className="flex flex-row w-2/3">
                  <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded-md mb-2 mr-1" />
                  <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded-md mb-2" />
                </div>
              </div>
            </div>
          </div>
        );
      }
      const fields = render('fields');
      return (
        <div
          className={clsx(
            'min-w-0 w-full group rounded-xl border border-transparent',
            'transition-all duration-150 ease-out hover:border-gray-200 hover:shadow-sm',
            view === 'grid'
              ? 'flex flex-col min-h-[280px]'
              : 'flex gap-4 min-h-[88px]'
          )}
        >
          <Link
            href={render('linkRead')}
            aria-label={fields.title}
            title={fields.title}
            target={render('targetBlank') === true ? '_blank' : undefined}
          >
            <div
              className={clsx(
                view === 'list'
                  ? 'flex-shrink-0 w-[72px] h-[72px] md:w-[200px] md:h-[130px] overflow-hidden rounded-lg transition-transform duration-300 ease-in-out'
                  : 'w-full h-[150px] mb-2 self-start rounded-lg overflow-hidden flex items-center justify-center bg-gray-50',

                { '!w-[72px] !h-[72px]': view === 'list' && render('small') }
              )}
            >
              <Image
                src={fields.cover_image_url}
                alt={fields.cover_image_url}
                width={72}
                height={72}
                className={clsx(
                  'group-hover:scale-110 transition-all ease-in duration-150 bg-gray-200',
                  'w-full h-full object-cover object-center'
                )}
              />
            </div>
          </Link>
          <div
            className={clsx(
              'w-full flex flex-col items-start justify-center',
              view === 'grid' ? 'px-3' : ''
            )}
          >
            <Link
              href={render('linkRead')}
              aria-label={fields.title}
              title={fields.title}
              target={render('targetBlank') === true ? '_blank' : undefined}
            >
              <h1 className="font-default font-medium text-lg leading-7 text-blue-gray-800 mb-[6px] group-hover:text-primary-700 line-clamp-2">
                {fields.title}
              </h1>
            </Link>
            {fields.description ? (
              <p className="font-normal text-sm leading-6 text-gray-600 mb-2 group-hover:text-blue-gray-600 line-clamp-2">
                {fields.description}
              </p>
            ) : null}
            <p className="font-normal text-xs leading-5 text-gray-500">
              <span className="capitalize flex items-center justify-center gap-2">
                <BaseIcon icon="calendar" className="w-4 h-4" />
                {fields.publish_date}
                {fields.category_name ? ` | ${fields.category_name}` : null}
              </span>
            </p>
          </div>
        </div>
      );
    },
  });
};

export default UINewsListItem;
