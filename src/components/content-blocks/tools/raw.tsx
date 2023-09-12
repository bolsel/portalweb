import { FC } from 'react';
import { ContentBlocksItemProps } from '../_base';

const RawTool: FC<ContentBlocksItemProps<{ html: string }>> = ({
  data: { html },
}) => {
  return (
    <div className="w-full -my-3" dangerouslySetInnerHTML={{ __html: html }} />
  );
};
export default RawTool;
