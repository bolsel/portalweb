import { FC, useEffect } from 'react';
import { ContentBlocksItemProps } from '../_base';
import clsx from 'clsx';
import BlurImage from '@/components/blur-image';
import imageZoom from 'fast-image-zoom';

const ImageTool: FC<
  ContentBlocksItemProps<{
    caption: string;
    file: any;
    stretched: boolean;
    withBackground: boolean;
    withBorder: boolean;
  }>
> = ({ data }) => {
  const { caption, withBackground = false, withBorder = false } = data;

  useEffect(() => {
    const destroy = imageZoom({
      selector: '.image-zoom',
      exceed: true,
    });
    return () => destroy();
  }, []);

  return (
    <div
      className={clsx('w-full', {
        'py-2 rounded-lg px-[10%] mx-auto bg-base-200/40': withBackground,
        'border border-base-200': withBorder,
      })}
    >
      <BlurImage
        alt=""
        width={data.file.width ?? 600}
        height={data.file.height ?? 600}
        sizes="100vw"
        className={clsx('image-zoom rounded-md m-0 w-full h-auto', {
          '!mb-7': !caption,
        })}
        src={data.file.url}
      />
      {caption ? (
        <div className="text-center italic text-sm">{caption}</div>
      ) : null}
    </div>
  );
};
export default ImageTool;
