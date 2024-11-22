'use client';

import ShareItem, { ShareItemProps } from './item';
import { TNewsOrWebNewsItemBySlug } from '@/types';
import { fetchNewsShareCount } from '@/lib/client';
import { useEffect, useState } from 'react';

export default function NewsShareItem({
  item,
  isPage,
  ...props
}: Partial<ShareItemProps> & {
  item: TNewsOrWebNewsItemBySlug;
  isPage?: true;
}) {
  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(`${window.origin}/${isPage ? 'page' : 'berita'}/${item.slug}`);
  }, [item, isPage]);
  return (
    <ShareItem
      url={url}
      title={item.title}
      quote={item.description}
      beforeOnClick={() => {
        fetchNewsShareCount(item);
      }}
      {...props}
    />
  );
}
