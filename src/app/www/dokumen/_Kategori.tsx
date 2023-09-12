'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function KategoriList({ categories }) {
  const searchParams = useSearchParams();
  const currentKategoriSlug = searchParams.get('kategori') ?? '';
  return (
    <section className="p-4 grid grid-cols-1 gap-4">
      <div className="flex">
        <Link
          href={`/dokumen`}
          className={clsx(
            'font-lato font-normal text-sm text-gray-700 cursor-pointer hover:scale-105',
            {
              'font-bold text-primary-600': '' === currentKategoriSlug,
            }
          )}
        >
          Terbaru
        </Link>
      </div>
      {categories.map((d, i) => (
        <div key={i} className="flex">
          <Link
            href={`/dokumen?kategori=${d.slug}`}
            className={clsx(
              'font-lato font-normal text-sm text-gray-700 cursor-pointer hover:scale-105',
              {
                'font-bold text-primary-600': d.slug === currentKategoriSlug,
              }
            )}
          >
            {d.name}
          </Link>
        </div>
      ))}
    </section>
  );
}
