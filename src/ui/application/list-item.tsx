import BaseIcon from '@/components/icons/base-icon';
import { RequireOnlyOne, TApiResourcePathReturn } from '../../types';
import clsx from 'clsx';
import Image from 'next/image';
import { ComponentProps } from 'react';
import { IUICreateCustomizableDefine, UICreateCustomizable } from '../create';

type _Item = TApiResourcePathReturn<'applications'>['read']['items'][0];

export type ItemLogoProps = {
  item: Record<string, any>;
} & Omit<ComponentProps<'div'>, 'children'>;

export function ItemLogo({ item, ...props }: ItemLogoProps) {
  return (
    <div {...props}>
      {item.logo && item.logo.url ? (
        <Image
          src={item.logo.url}
          width={50}
          height={50}
          alt={`Logo ${item.slug}`}
          className="w-full"
        />
      ) : (
        <BaseIcon icon="apps" className="text-primary" width={48} height={48} />
      )}
    </div>
  );
}

export type UIApplicationListItemType<Item extends _Item> =
  IUICreateCustomizableDefine<
    RequireOnlyOne<
      {
        item: Item;
        skeleton: true;
        onAction?: (item: Item) => void;
      },
      'item' | 'skeleton'
    >
  >;

const UIApplicationListItem = <Item extends _Item>(
  props: UIApplicationListItemType<Item>['props']
) =>
  UICreateCustomizable<UIApplicationListItemType<Item>>({
    props,
    defaults: {},
    Component({ item, onAction, skeleton }) {
      if (skeleton) {
        return (
          <div
            className={clsx(
              'min-w-0 flex gap-4 p-4 rounded-xl border border-[#E9EDF4]'
            )}
          >
            <div className="w-[60px] h-[60px] object-cover rounded-full bg-gray-200 animate-pulse" />
            <div className="flex-1">
              <div className="w-3/4 h-5 bg-gray-200 animate-pulse rounded-md mb-2" />
              <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded-md mb-3" />
              <div className="w-4/5 h-3 bg-gray-200 animate-pulse rounded-md mb-1" />
              <div className="w-3/5 h-3 bg-gray-200 animate-pulse rounded-md mb-3" />
              <div className="w-[100px] h-[31px] bg-gray-200 animate-pulse rounded-md" />
            </div>
          </div>
        );
      }
      return (
        <div
          onClick={() => onAction?.(item)}
          className="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none
min-w-full flex border border-primary-50
p-4 w-full cursor-pointer group hover:bg-primary-50 rounded-lg"
        >
          <div className="flex gap-2 items-start h-full">
            <ItemLogo
              item={item}
              className="rounded-box bg-gray-100 group-hover:bg-primary-200 p-1 lg:p-3 w-[50px] md:w-[70px] lg:w-[100px] flex items-center justify-center"
            />
            <div className="flex-1">
              <div className="">
                <span
                  className="inline-block rounded-md px-2 py-1 text-xs font-semibold text-gray-700 bg-primary-50
group-hover:text-primary-700 group-hover:bg-primary-200"
                >
                  {item.slug}
                </span>
              </div>
              <div className="font-lato font-bold text-sm text-blue-gray-800 leading-1 md:text-base">
                {item.title}
              </div>

              <p className="w-4/4 font-lato text-sm font-normal text-[#415C84] leading-5 line-clamp-3 md:line-clamp-2 mt-3 mb-3">
                {item.description}
              </p>
              {item.categories?.map((category, i) => {
                return (
                  <div
                    key={i}
                    className="inline-block rounded-lg py-1 px-2 text-xs font-normal text-gray-700 bg-gray-100
group-hover:text-primary-700 group-hover:bg-primary-100 mr-2"
                  >
                    {category.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    },
  });

export default UIApplicationListItem;
