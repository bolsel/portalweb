export type ContentBlocksBaseProps = {
  time: number;
  blocks: Record<string, any>;
  version: string;
};
export type ContentBlocksItemProps<
  Data extends Record<string, any>,
  Ext extends Record<string, any> = {}
> = {
  id: string;
  type: string;
  data: Data;
} & Ext;

export type ContentBlocksTunesProps = {
  alignment: { alignment: string };
};

export function tunesAlignmentClass(tunes: ContentBlocksTunesProps) {
  return tunes?.alignment && tunes?.alignment?.alignment
    ? tunes.alignment.alignment
    : 'justify';
}
