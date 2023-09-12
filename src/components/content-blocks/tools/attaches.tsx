import { FC } from 'react';
import { ContentBlocksItemProps } from '../_base';
import BaseIcon from '@/components/icons/base-icon';
import { humanFileSize } from '@/lib/utils';

const AttachesTool: FC<
  ContentBlocksItemProps<{ file: any; title: string }>
> = ({ data: { file, title } }) => {
  return (
    <div
      className="hover:bg-primary-50 my-5 bg-base-200/80 border p-5 rounded-lg flex gap-2 items-center"
      title={title}
    >
      <div className="relative">
        <BaseIcon icon={'file'} className="text-neutral w-[50px] h-[50px]" />
        <div className="badge badge-primary absolute bottom-0 bg-primary text-xs p-1 rounded-lg">
          {file.extension}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <a
          target="_blank"
          href={file.url}
          className="no-underline line-clamp-1"
          rel="noreferrer"
        >
          {title}
        </a>
        <div className="text-sm text-gray-600">{humanFileSize(file.size)}</div>
      </div>
      <div>
        <a
          title="Unduh file"
          target="_blank"
          href={file.url}
          className="btn btn-sm btn-primary btn-circle"
          rel="noreferrer"
        >
          <BaseIcon icon={'download'} className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
};
export default AttachesTool;
