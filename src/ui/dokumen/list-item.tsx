import clsx from 'clsx';
import Link from 'next/link';

import Image from 'next/image';
import { ReactNode } from 'react';
import { IUICreateCustomizableDefine, UICreateCustomizable } from '../create';
import { UIListViewType } from '@/types';
import BaseIcon from '@/components/icons/base-icon';
import DocumentIcon from '@/components/icons/document-icon';

export type UIDocumentListItemType<Item extends Record<string, any>> =
  IUICreateCustomizableDefine<
    {
      skeleton?: boolean;
      item: Item;
      view: UIListViewType;
    },
    {
      small: boolean;
      hideCategory: boolean;
      fields: {
        title: string;
        slug: string;
        file: Record<string, any>;
        category_name: string;
        description: string;
        cover_image_url: string;
        publish_date: string;
      };
      itemAction?: (item: Item) => void;
      documentIcon: ReactNode;
    }
  >;
const UIDocumentListItem = <Item extends Record<string, any>>(
  props: UIDocumentListItemType<Item>['props']
) => {
  return UICreateCustomizable<UIDocumentListItemType<Item>>({
    props,
    defaults: {
      small: () => false,
      hideCategory: () => false,
      fields: ({ item }) => ({
        title: item.title,
        slug: item.slug,
        file: item.file,
        category_name: item.category.name,
        description: item.description,
        cover_image_url: item.image_cover?.url,
        publish_date: item.publish_date_format ?? item.publish_date,
      }),
      documentIcon: ({ render }) => {
        return (
          <DocumentIcon
            className="font-default w-[30px] h-[30px] md:w-[60px] md:h-[60px] fill-primary text-white"
            text={
              render('fields').file.type === 'application/pdf' ? 'PDF' : '.'
            }
          />
        );
      },
    },
    Component({ item, view, render, skeleton }) {
      if (skeleton) {
        return (
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
        );
      }
      const fields = render('fields');
      return (
        <div className="flex justify-start items-start w-full p-4 gap-4 border border-gray-100 rounded-xl">
          <div className="">{render('documentIcon')}</div>

          <div className="text-left flex flex-col">
            {!render('hideCategory') && (
              <div className="flex gap-2">
                <span
                  className="inline-block rounded-md px-[10px] py-2 text-xs font-normal text-gray-700 bg-gray-100 mb-2
    hover:text-primary-700 hover:bg-primary-50"
                >
                  {fields.category_name}
                </span>
              </div>
            )}
            <h3 className="font-default text-left font-medium text-lg text-blue-gray-800 mb-2 line-clamp-2">
              {fields.title}
            </h3>
            <p className="font-default font-normal text-sm text-blue-gray-800 line-clamp-2">
              {fields.description}
            </p>
            <div className="mt-5 flex  gap-2 items-start md:items-center">
              <button
                type="button"
                onClick={() => {
                  const itemAction = render('itemAction');
                  if (itemAction) itemAction(item);
                }}
                className="font-default gap-2 normal-case btn btn-outline btn-sm btn-primary"
              >
                <BaseIcon icon="eye" fontSize="18px" />
                Selengkapnya
              </button>
              <Link
                href={fields.file.url}
                target="_blank"
                title={fields.title}
                download
                className="font-default gap-2 normal-case btn text-white btn-sm btn-primary"
              >
                <BaseIcon icon="download" fontSize="18px" />
                Unduh
              </Link>
            </div>
          </div>
        </div>
      );
    },
  });
};
export default UIDocumentListItem;
