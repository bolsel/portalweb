import { FC } from 'react';
import {
  ContentBlocksItemProps,
  ContentBlocksTunesProps,
  tunesAlignmentClass,
} from '../_base';

const HeadingTool: FC<
  ContentBlocksItemProps<
    { text: string; level: number },
    {
      tunes: ContentBlocksTunesProps;
    }
  >
> = ({ data: { text, level }, tunes }) => {
  const textAlign = tunesAlignmentClass(tunes);
  const props = { className: `text-${textAlign}` };
  switch (level) {
    case 1:
      return <h1 {...props} dangerouslySetInnerHTML={{ __html: text }} />;
    case 2:
      return <h2 {...props} dangerouslySetInnerHTML={{ __html: text }} />;
    case 3:
      return <h3 {...props} dangerouslySetInnerHTML={{ __html: text }} />;
    case 4:
      return <h4 {...props} dangerouslySetInnerHTML={{ __html: text }} />;
    case 5:
      return <h5 {...props} dangerouslySetInnerHTML={{ __html: text }} />;
    default:
      return <h6 {...props} dangerouslySetInnerHTML={{ __html: text }} />;
  }
};
export default HeadingTool;
