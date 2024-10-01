import { ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IUICreateCustomizableDefine, UICreateCustomizable } from '../create';
import DocumentIcon from '@/components/icons/document-icon';
import BaseIcon from '@/components/icons/base-icon';
import { documentMimeTypeLabel, humanFileSize } from '@/lib/utils';
import ShareItem from '@/components/share/item';
import DokumenShareItem from '@/components/share/item-dokumen';

export type UIDocumentItemDetailType<Item extends Record<string, any>> =
  IUICreateCustomizableDefine<
    {
      skeleton?: boolean;
      item: Item;
    },
    {
      fields: {
        title: string;
        slug: string;
        file: Record<string, any>;
        category_name: string;
        description: string;
        cover_image_url: string;
        publish_date: string;
        date_updated: string;
      };
      documentIcon: ReactNode;
      descriptionScroll: boolean;
      showDownloadLink: boolean;
    }
  >;
const UIDocumentItemDetail = <Item extends Record<string, any>>(
  props: UIDocumentItemDetailType<Item>['props']
) => {
  return UICreateCustomizable<UIDocumentItemDetailType<Item>>({
    props,
    defaults: {
      fields: ({ item }) => ({
        title: item.title,
        slug: item.slug,
        file: item.file,
        category_name: item.category_name,
        description: item.description,
        cover_image_url: item.image_cover?.url,
        publish_date: item.publish_date_format ?? item.publish_date,
        date_updated: item.date_updated_format ?? item.date_updated,
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
      descriptionScroll: () => true,
      showDownloadLink: () => false,
    },
    Component({ item, render, skeleton }) {
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
        <div className="flex flex-col p-4 md:p-6 gap-2 max-w-[550px] overflow-y-auto overflow-x-hidden">
          <section className="flex gap-4">
            <div className="w-6">
              <BaseIcon
                icon="info"
                className="self-start text-primary w-6 h-6"
              />
            </div>
            <div>
              <h2 className="font-default text-xs text-blue-gray-400 mb-1 leading-5">
                Deskripsi Dokumen
              </h2>

              <div
                className={clsx('w-full pr-4', {
                  'max-h-[116px] overflow-y-auto': render('descriptionScroll'),
                })}
              >
                <p className="text-gray-800 font-normal text-sm leading-relaxed mb-4 text-justify">
                  {fields.description ?? '-'}
                </p>
              </div>
            </div>
          </section>
          <section className="flex gap-4">
            <div className="w-6">
              <BaseIcon
                icon="file"
                className="self-start text-primary w-6 h-6"
              />
            </div>
            <div>
              <h2 className="font-default text-xs text-blue-gray-400 mb-1 leading-5">
                Format Dokumen
              </h2>
              <p
                className="inline-block rounded-md px-[10px] py-2 text-xs font-normal text-gray-700 bg-gray-100 mb-4
hover:text-primary-700 hover:bg-primary-100"
              >
                {documentMimeTypeLabel(fields.file.type)}
              </p>
            </div>
          </section>
          <section className="flex gap-4">
            <div className="w-6">
              <BaseIcon
                icon="document-file"
                className="self-start text-primary w-6 h-6"
              />
            </div>
            <div>
              <h2 className="font-default text-xs text-blue-gray-400 mb-1 leading-5">
                Ukuran Dokumen
              </h2>
              <p className="text-gray-800 font-normal text-sm leading-relaxed mb-4">
                {humanFileSize(fields.file.filesize, true, 0)}
              </p>
            </div>
          </section>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="flex gap-4">
              <div className="w-6">
                <BaseIcon
                  icon="calendar"
                  className="self-start text-primary w-6 h-6"
                />
              </div>
              <div>
                <h2 className="font-default text-xs text-blue-gray-400 mb-1 leading-5">
                  Tanggal Publish
                </h2>
                <p className="text-gray-800 font-normal text-sm leading-relaxed mb-4">
                  {fields.publish_date}
                </p>
              </div>
            </section>
            <section className="flex gap-4">
              <div className="w-6">
                <BaseIcon
                  icon="calendar"
                  className="self-start text-primary w-6 h-6"
                />
              </div>
              <div>
                <h2 className="font-default text-xs text-blue-gray-400 mb-1 leading-5">
                  Diupdate pada
                </h2>
                <p className="text-gray-800 font-normal text-sm leading-relaxed mb-4">
                  {fields.date_updated ?? '-'}
                </p>
              </div>
            </section>
          </div>

          <section className="flex gap-4">
            <div className="w-6">
              <BaseIcon
                icon="share"
                className="self-start text-primary w-6 h-6"
              />
            </div>
            <div className="overflow-auto">
              <h2 className="font-default text-xs text-blue-gray-400 mb-1 leading-5">
                Bagikan Dokumen
              </h2>
              <DokumenShareItem item={item as any} />
              {/* <ShareItem
                url={`https://www.bolselkab.go.id/dokumen/${item.slug}`}
                title={item.title}
                quote={item.description}
              /> */}
            </div>
          </section>

          {render('showDownloadLink') && (
            <div className="mt-5 flex items-center justify-center">
              <Link
                className="btn btn-primary btn-outline btn-sm text-white gap-2"
                href={item.file.url}
                target="_blank"
                download
              >
                <BaseIcon icon="download" className="w-5 h-5" /> Unduh Dokumen
              </Link>
            </div>
          )}
        </div>
      );
    },
  });
};

export default UIDocumentItemDetail;
