'use client';
import BaseIcon from '@/components/icons/base-icon';
import { LightboxImageGallery } from '@/components/lightbox-image-gallery';
import { nextImageUrl } from '@/init';
import { TApiResourcePathReturn } from '@/types';
import { Item } from 'react-photoswipe-gallery';

export default function ShowCover({
  item,
}: {
  item: TApiResourcePathReturn<'news'>['read']['bySlug'];
}) {
  return (
    <LightboxImageGallery>
      {() => (
        <Item
          original={item.image_cover.url}
          thumbnail={nextImageUrl({
            url: item.image_cover.url,
            width: 640,
            quality: 75,
          })}
          width={item.image_cover.width ?? 1000}
          height={item.image_cover.height ?? 1000}
          alt="aaa"
        >
          {({ open }) => (
            <button
              title="Lihat gambar cover"
              data-tip="Lihat gambar cover "
              onClick={open}
              className="tooltip btn btn-primary btn-sm w-[fit-content] flex gap-2"
            >
              <BaseIcon icon="image" className="h-5 w-5" />
            </button>
          )}
        </Item>
      )}
    </LightboxImageGallery>
  );
}
