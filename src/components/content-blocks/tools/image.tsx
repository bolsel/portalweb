import { FC } from 'react';
import { ContentBlocksItemProps } from '../_base';
import clsx from 'clsx';
import BlurImage from '@/components/blur-image';

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
  return (
    <div
      className={clsx('w-full', {
        'py-2 rounded-lg px-[10%] mx-auto bg-base-200/40': withBackground,
        'border border-base-200': withBorder,
      })}
    >
      <BlurImage
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className={clsx('rounded-md m-0 w-full', {
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
