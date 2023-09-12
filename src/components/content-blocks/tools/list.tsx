import { FC } from 'react';
import { ContentBlocksItemProps } from '../_base';
import clsx from 'clsx';

const ListTool: FC<ContentBlocksItemProps<{ style: string; items: any }>> = ({
  data: { items, style },
}) => {
  const ListType = ({ style, items, withChildren = false }) => {
    const _items = items.map((item, index) => (
      <li key={index} className="cdx-nested-list__item">
        <div className="cdx-nested-list__item-body">
          <div
            className="cdx-nested-list__item-content"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
          {item.items ? (
            <ListType withChildren style={style} items={item.items} />
          ) : null}
        </div>
      </li>
    ));
    if (style === 'unordered') {
      return (
        <ul
          className={clsx(
            'cdx-nested-list',
            { 'cdx-nested-list__item-children': withChildren },
            `cdx-nested-list--${style}`
          )}
        >
          {_items}
        </ul>
      );
    }
    return (
      <ol
        className={clsx(
          'cdx-nested-list',
          { 'cdx-nested-list__item-children': withChildren },
          `cdx-nested-list--${style}`
        )}
      >
        {_items}
      </ol>
    );
  };
  return <ListType withChildren style={style} items={items} />;
};
export default ListTool;
