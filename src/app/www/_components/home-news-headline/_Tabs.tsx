'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

export default function Tabs({ dataPopular, dataLatest }) {
  const [type, setType] = useState('latest');

  return (
      <div className="grid h-[518px] w-full grid-cols-1 grid-rows-[38px,1fr] gap-4">
        <div
          className="mb-4 grid h-full w-full grid-cols-2"
          role="tablist"
          aria-label="Tab berita terbaru dan terpopuler"
        >
          <button
            role="tab"
            onClick={() => setType('latest')}
            className={clsx(
              'cursor-pointer border-b-4 pb-3 text-center text-sm uppercase',
              type === 'latest'
                ? 'border-primary font-bold'
                : 'border-blue-gray-50 text-gray-700'
            )}
          >
            Terbaru
          </button>
          <button
            role="tab"
            onClick={() => setType('popular')}
            className={clsx(
              'cursor-pointer border-b-4 pb-3 text-center text-sm uppercase',
              type === 'popular'
                ? 'border-primary font-bold'
                : 'border-blue-gray-50 text-gray-700'
            )}
          >
            Terpopuler
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {(type === 'latest' ? dataLatest : dataPopular).map((item, index) => (
            <div
              key={index}
              className={clsx(
                'min-h-[88px] flex overflow-hidden w-full gap-4 border-4 border-transparent rounded-xl',
                'group hover:bg-primary/5 p-1 transition-colors ease-brand duration-250'
              )}
            >
              <div className="w-full flex flex-col items-start justify-center">
                <Link href={`/berita/${item.slug}`}>
                  <h2 className="mb-2 line-clamp-2 font-medium leading-7 group-hover:text-primary">
                    {item.title}
                  </h2>
                </Link>
                <div className="font-normal text-xs leading-5 text-neutral">
                  <span className="group-hover:text-neutral capitalize">
                    {item.category.name}
                  </span>
                  <span className="mx-1">|</span>
                  <span className="group-hover:text-neutral">
                    {item.publish_date_format}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}
