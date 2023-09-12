import { FC } from 'react';
import { ContentBlocksItemProps, ContentBlocksTunesProps } from '../_base';

const QuoteTool: FC<
  ContentBlocksItemProps<
    {
      alignment: string;
      caption: string;
      text: string;
    },
    {
      tunes: ContentBlocksTunesProps;
    }
  >
> = ({ data: { alignment, caption, text } }) => {
  return (
    <figure className="w-full mx-auto text-center">
      <blockquote>
        <p className="" dangerouslySetInnerHTML={{ __html: text }} />
      </blockquote>
      {caption ? (
        <figcaption className="italic">
          <cite className="">{caption}</cite>
        </figcaption>
      ) : null}
    </figure>
  );
};
export default QuoteTool;
