'use client';

import BaseIcon from '@/components/icons/base-icon';
import { useModal } from '@/components/modal/provider';
import NewsShareItem from '@/components/share/item-news';
import { TNewsOrWebNewsItemBySlug } from '@/types';

export default function ShareButton({
  item,
}: {
  item: TNewsOrWebNewsItemBySlug;
}) {
  const modal = useModal();
  const showShareModal = () => {
    modal?.show(
      <div className="py-4 px-6 max-w-[510px] flex flex-col">
        <section className="flex gap-4 mb-4 w-full">
          <div>
            <BaseIcon icon="info" className="text-primary w-5 h-5" />
          </div>
          <div>
            <h2 className="font-default text-xs text-blue-gray-200 mb-1 leading-5">
              Judul Berita
            </h2>
            <p className="text-gray-800 font-bold leading-relaxed">
              {item.title}
            </p>
          </div>
        </section>
        <section className="flex gap-4 w-full">
          <div>
            <BaseIcon icon="share" className="text-primary w-5 h-5" />
          </div>
          <div className="w-full">
            <h2 className="font-default text-xs text-blue-gray-200 mb-1 leading-5">
              Bagikan Melalui
            </h2>
            <NewsShareItem item={item} />

            <h2 className="mt-3 font-default text-xs text-blue-gray-200 mb-1 leading-5">
              Telah dibagikan sebanyak <strong>{item.shared_count}</strong>x
            </h2>
          </div>
        </section>
      </div>,
      {
        header: () => () =>
          (
            <h1 className="px-6 py-2 font-medium text-2xl text-primary leading-relaxed">
              Bagikan Berita
            </h1>
          ),
        showCloseButton: () => false,
      }
    );
  };
  return (
    <button
      className="btn btn-primary btn-sm w-[fit-content] flex gap-2"
      onClick={showShareModal}
    >
      Bagikan Berita
      <BaseIcon icon="share-all-outline" className="h-5 w-5" />
    </button>
  );
}
