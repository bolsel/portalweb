import { FC } from 'react';
import { ContentBlocksItemProps } from '../_base';

const TableTool: FC<
  ContentBlocksItemProps<{ withHeadings: boolean; content: string[][] }>
> = ({ data: { content, withHeadings } }) => {
  const RenderCell = ({ items, heading = false }) => {
    return items.map((item, i) => {
      if (heading) {
        return <th key={i} dangerouslySetInnerHTML={{ __html: item }} />;
      }
      return <td key={i} dangerouslySetInnerHTML={{ __html: item }} />;
    });
  };
  const header: any = [],
    body: any = [];
  content.forEach((cells, i) => {
    if (withHeadings && i === 0) {
      header.push(
        <tr key={i}>
          <RenderCell heading items={cells} />
        </tr>
      );
    } else {
      body.push(
        <tr key={i}>
          <RenderCell items={cells} key={i} />
        </tr>
      );
    }
  });
  return (
    <div className="overflow-x-auto my-5 w-full bg-base-200/40 p-3 rounded-lg">
      <table className="table table-compact w-full p-0 m-0">
        {header.length ? <thead>{header}</thead> : null}
        {body.length ? <tbody>{body}</tbody> : null}
      </table>
    </div>
  );
};
export default TableTool;
