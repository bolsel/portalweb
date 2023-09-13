import { NextRequest } from 'next/server';
import BaseOgImage from '../base-og-image';
import { apiResourceItemPathRead } from '@/lib/api';
import { DOMAIN_WWW } from '@/init';

export const runtime = 'edge';

export async function GET(
  req: NextRequest,
  { params: { paths } }: { params: { paths: string[] } }
) {
  const [site, type, slug] = paths;
  let title, description;
  let images: string[] = [];
  let domain = DOMAIN_WWW;
  if (type === 'berita') {
    title = 'Berita';
    description = process.env.NEXT_PUBLIC_MAIN_TITLE;
    if (slug) {
      const item = await apiResourceItemPathRead('news')
        .bySlug({
          paths: [slug],
        })
        .catch(() => null);
      if (item) {
        title = item.title;
        description = item.description;
        images = [item.image_cover.url];
        item.content.blocks.forEach((c) => {
          if (c.type === 'image') {
            images.push(c.data.file.url);
          }
        });
      }
    }
  }

  return BaseOgImage({
    title,
    description,
    req,
    images,
    domain,
  });
}
