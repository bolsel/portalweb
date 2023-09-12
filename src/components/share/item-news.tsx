'use client';

import ShareItem, { ShareItemProps } from './item';
import { TNewsOrWebNewsItemBySlug } from '@/types';
import { fetchNewsShareCount } from '@/lib/client';
import { useEffect, useState } from 'react';

export default function NewsShareItem({
  item,
  ...props
}: Partial<ShareItemProps> & {
  item: TNewsOrWebNewsItemBySlug;
}) {
  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(`${window.origin}/berita/${item.slug}`);
  }, [item]);
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
