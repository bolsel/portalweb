import { FC } from 'react';
import { ContentBlocksItemProps } from '../_base';

const DelimiterTool: FC<ContentBlocksItemProps<{}>> = () => {
  return (
    <div className="w-full my-5 text-center text-3xl leading-4	tracking-widest font-bold text-gray-600">
      ***
    </div>
  );
};
export default DelimiterTool;
