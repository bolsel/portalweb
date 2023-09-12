import Breadcrumb from '@/components/breadcrumb/breadcrumb';
import BaseIcon from '@/components/icons/base-icon';
import { TApiResourcePathReturn } from '@/types';
import Image from 'next/image';
import ShareButton from './_share-button';

export default function Header({
  item,
}: {
  item: TApiResourcePathReturn<'news'>['read']['bySlug'];
}) {
  const breadcrumbItems = [
    { link: '/', label: 'Beranda' },
    { link: '/berita', label: 'Berita' },
    {
      link: `/berita/kategori/${item.category.slug}`,
      label: item.category.name,
      active: true,
    },
  ];
  return (
    <section className="relative w-full min-h-[422px] md:min-h-[400px] bg-gray-800 bg-cover bg-center bg-no-repeat">
      <Image
        src={item.image_cover.url}
        priority
        alt={''}
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-full absolute object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(270.04deg, rgba(0, 23, 28, 0.5) 0.04%, rgba(0, 11, 14, 0.75) 39.38%, rgba(35, 7, 0, 0.98) 99.96%)',
        }}
      />
      <div className="ui-container relative pt-24 py-6 lg:pb-9 z-10">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col text-white md:text-blue-gray-100 gap-6 min-h-[250px]">
          <h1 className="flex flex-1 items-end font-content-title font-bold text-2xl leading-9 md:text-[32px] md:leading-[48px] text-white max-w-3xl">
            {item.title}
          </h1>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <BaseIcon icon="calendar" className="w-4 h-4" />
              <p className="text-sm">
                {item.publish_date_date.toLocaleDateString('id-ID', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <BaseIcon icon="pencil" className="w-4 h-4" />
              <p className="text-sm">
                Penulis: <span className="capitalize">{item.writer}</span>
                {' | '}
                Editor: <span className="capitalize ">{item.editor}</span>
              </p>
              <div className="hidden lg:flex items-center gap-2">
                | <BaseIcon icon="camera" className="w-4 h-4" />
                <p className="text-sm">
                  Peliput: <span className="capitalize">{item.reporter}</span>
                </p>
              </div>
            </div>
            <div className="lg:hidden flex items-center gap-2">
              <BaseIcon icon="camera" className="w-4 h-4" />
              <p className="text-sm">
                Peliput: <span className="capitalize">{item.reporter}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:flex-row justify-between text-white">
            <div className="flex gap-4 justify-between md:justify-start items-center">
              <div className="flex flex-row gap-3 items-start">
                <div className="border rounded-full border-white w-7 h-7 flex justify-center items-center border-opacity-25">
                  <BaseIcon icon="eye" />
                </div>
                <div>
                  <p>{item.view_count} kali</p>
                  <p className="text-xs text-blue-gray-100">
                    Berita ini dilihat
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-3 items-start">
                <div className="border rounded-full border-white w-7 h-7 flex justify-center items-center border-opacity-25">
                  <BaseIcon icon="share" className="w-[12px] h-[12px]" />
                </div>
                <div>
                  <p>{item.shared_count} kali</p>
                  <p className="text-xs text-blue-gray-100">
                    Berita ini dibagikan
                  </p>
                </div>
              </div>
            </div>
            <ShareButton item={item} />
          </div>
        </div>
      </div>
    </section>
  );
}
