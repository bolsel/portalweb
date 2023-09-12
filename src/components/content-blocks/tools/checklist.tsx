import { FC } from 'react';
import { ContentBlocksItemProps } from '../_base';
import BaseIcon from '@/components/icons/base-icon';

const ChecklistTool: FC<
  ContentBlocksItemProps<{
    items: {
      text: string;
      checked: boolean;
    }[];
  }>
> = ({ data: { items } }) => {
  return (
    <div className="w-full my-5 flex flex-col">
      {items.map((item, i) => {
        return (
          <div key={i} className="flex items-center gap-2">
            <div className="bg-base-200 border rounded-md w-5 h-5 flex items-center justify-center">
              {item.checked ? (
                <BaseIcon
                  className="text-primary w-full h-full"
                  icon={'check'}
                />
              ) : (
                ' '
              )}
            </div>
            <div dangerouslySetInnerHTML={{ __html: item.text }} />
          </div>
        );
      })}
    </div>
  );
};
export default ChecklistTool;
