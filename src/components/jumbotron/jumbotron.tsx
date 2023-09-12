import clsx from 'clsx';
import Breadcrumb, { BreadcrumbProps } from '../breadcrumb/breadcrumb';
import Image from 'next/image';

export type JumbotronProps = {
  breadcrumb?: BreadcrumbProps['items'];
  bgImage?: string;
  title: string;
  subtitle?: string;
  suffix?: any;
};

export default function Jumbotron({
  breadcrumb,
  bgImage = '/images/bg/jumbotron-default.jpeg',
  title,
  subtitle,
  suffix,
}: JumbotronProps) {
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
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        {title && (
          <h1 className="font-content-title font-bold text-3xl leading-relaxed text-primary-500 mb-2">
            {title}
          </h1>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-4">
          {subtitle && (
            <h2
              className={clsx(
                'font-default text-sm leading-6 text-white line-clamp-4',
                {
                  'sm:col-span-4': suffix,
                  'sm:col-span-2': !suffix,
                }
              )}
            >
              {subtitle}
            </h2>
          )}
          {suffix && (
            <div className="sm:col-span-2 sm:justify-self-end sm:self-end mt-[10px] sm:mt-0">
              {suffix}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
