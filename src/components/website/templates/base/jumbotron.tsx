'use client';

import { useSiteContext } from '../../provider';
import Image from 'next/image';
import clsx from 'clsx';
import Breadcrumb from '@/components/breadcrumb/breadcrumb';
export default function Jumbotron({
  bgImage = '/images/bg/jumbotron-default.jpeg',
}) {
  const siteLayoutContext = useSiteContext();
  const { page } = siteLayoutContext;
  return (
    <section className="relative w-full bg-gray-800">
      <Image
        src={bgImage}
        alt={bgImage}
        width={100}
        height={100}
        sizes="100vw"
        className="absolute w-full h-full object-cover"
      />
      <div className="jumbotron-overlay" />
      <div className="ui-container relative pt-24 pb-40 z-10">
        <h1 className="font-intro font-bold text-3xl leading-relaxed text-primary-500 mb-2">
          {page.title}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-4">
          {page.subTitle && (
            <h2
              className={clsx(
                'font-intro text-sm leading-6 text-white line-clamp-4 sm:col-span-2'
              )}
            >
              {page.subTitle}
            </h2>
          )}
        </div>
      </div>
    </section>
  );
}
