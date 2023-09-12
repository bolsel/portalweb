import { TApiResourcePathReturn } from '@/types';
import Link from 'next/link';
import { IUICreateCustomizableDefine, UICreateCustomizable } from '../create';
import BaseIcon, { BaseIconNamesType } from '@/components/icons/base-icon';

type _Item = TApiResourcePathReturn<'applications'>['read']['items'][0];

export type UIApplicationItemDetailType<Item extends _Item> =
  IUICreateCustomizableDefine<{
    item: Item;
  }>;

const UIApplicationItemDetail = <Item extends _Item>(
  props: UIApplicationItemDetailType<Item>['props']
) =>
  UICreateCustomizable<UIApplicationItemDetailType<Item>>({
    props,
    defaults: {},
    Component({ item }) {
      return (
        <div className="flex flex-col p-4 md:p-6 gap-2 max-w-[550px] overflow-y-auto overflow-x-hidden">
          <section className="col-span-2 flex gap-4">
            <div className="w-6">
              <BaseIcon
                icon="info"
                className="self-start text-primary w-6 h-6"
              />
            </div>
            <div>
              <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                Deskripsi Aplikasi
              </h2>
              <div className="w-full max-h-[116px] overflow-y-auto pr-4">
                <p className="text-gray-800 font-normal text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>
            </div>
          </section>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="flex gap-4">
              <div className="w-6">
                <BaseIcon
                  icon="organization"
                  className="self-start text-primary w-6 h-6"
                />
              </div>
              <div>
                <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                  Organisasi
                </h2>
                <p className="text-gray-800 font-normal text-sm leading-relaxed mb-4">
                  {item.organization?.name ?? '-'}
                </p>
              </div>
            </section>
            <section className="flex gap-4">
              <div className="w-6">
                <BaseIcon
                  icon="category"
                  className="self-start text-primary w-6 h-6"
                />
              </div>
              <div>
                <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                  Kategori Aplikasi
                </h2>
                <div className="flex gap-1 flex-col mb-4">
                  {item.categories.map((category, i) => (
                    <div
                      key={i}
                      className=" rounded-lg py-1 px-2 text-xs font-normal text-gray-700 bg-gray-100
  hover:text-primary-700 hover:bg-primary-100"
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <section className="flex gap-4">
            <div className="w-6">
              <BaseIcon
                icon="link"
                className="self-start text-primary w-6 h-6"
              />
            </div>
            <div>
              <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                Link Aplikasi
              </h2>
              <p className="text-gray-800 font-normal text-sm leading-relaxed mb-4">
                {item.link ? (
                  <Link
                    className="link link-primary"
                    href={item.link}
                    target="_blank"
                  >
                    {item.link}
                  </Link>
                ) : (
                  '-'
                )}
              </p>
            </div>
          </section>
          {item.links && item.links.length ? (
            <section className="flex gap-4">
              <div className="w-6">
                <BaseIcon
                  icon="link"
                  className="self-start text-primary w-6 h-6"
                />
              </div>
              <div>
                <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                  Link Lainnya
                </h2>
                <div className="flex gap-2">
                  {item.links?.map((sm, i) => {
                    let _icon: BaseIconNamesType = 'web';
                    if (sm.name === 'playstore') _icon = 'playstore';
                    else if (sm.name === 'appstore') _icon = 'appstore';
                    return (
                      <Link
                        key={i}
                        target="_blank"
                        title={sm.name}
                        href={sm.link}
                        className="flex flex-col p-2 items-center justify-center gap-1 rounded-lg hover:bg-primary-50"
                      >
                        <BaseIcon icon={_icon} className="w-8 h-8" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          ) : null}
          <section className="flex gap-4">
            <div className="w-6">
              <BaseIcon
                icon="share"
                className="self-start text-primary w-6 h-6"
              />
            </div>
            <div>
              <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                Sosial Media
              </h2>
              <div className="flex gap-2">
                {!item.social_media
                  ? '-'
                  : item.social_media.map((sm, i) => (
                      <Link
                        key={i}
                        target="_blank"
                        title={sm.name}
                        href={sm.link}
                        className="flex flex-col p-2 items-center justify-center gap-1 rounded-lg hover:bg-primary-50"
                      >
                        <BaseIcon icon="link" className="w-8 h-8" />
                      </Link>
                    ))}
              </div>
            </div>
          </section>
        </div>
      );
    },
  });
export default UIApplicationItemDetail;
