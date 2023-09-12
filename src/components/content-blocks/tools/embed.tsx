import { FC } from 'react';
import { ContentBlocksItemProps } from '../_base';
import clsx from 'clsx';

const EmbedTool: FC<
  ContentBlocksItemProps<{
    caption: string;
    embed: string;
    height: number;
    width: number;
    service: string;
    source: string;
  }>
> = ({ data: { caption, embed, source } }) => {
  return (
    <div className={clsx('w-full my-5 h-[400px]')}>
      <iframe
        className="w-full h-full rounded-lg"
        src={embed}
        title={caption ?? source}
      >
        Browser tidak support frame.
      </iframe>
      {caption ? (
        <div className="text-center italic text-sm">{caption}</div>
      ) : null}
    </div>
  );
};
export default EmbedTool;
