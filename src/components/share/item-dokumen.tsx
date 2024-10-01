'use client';

import ShareItem, { ShareItemProps } from './item';
import { TDocumentItem } from '@/types';
import { fetchNewsShareCount } from '@/lib/client';
import { useEffect, useState } from 'react';

export default function DokumenShareItem({
  item,
  ...props
}: Partial<ShareItemProps> & {
  item: TDocumentItem;
}) {
  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(`${window.origin}/dokumen/${item.slug}`);
  }, [item]);
  return (
    <ShareItem
      url={url}
      title={item.title}
      quote={item.description}
      {...props}
    />
  );
}
