import { FC } from 'react';
import {
  ContentBlocksItemProps,
  ContentBlocksTunesProps,
  tunesAlignmentClass,
} from '../_base';

const ParagraphTool: FC<
  ContentBlocksItemProps<
    { text: string },
    {
      tunes: ContentBlocksTunesProps;
    }
  >
> = ({ data, tunes }) => {
  const textAlign = tunesAlignmentClass(tunes);
  return (
    <p
      className={`text-${textAlign} text-justify`}
      dangerouslySetInnerHTML={{ __html: data.text }}
    />
  );
};
export default ParagraphTool;
