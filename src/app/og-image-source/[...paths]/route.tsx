import { NextRequest } from 'next/server';
import BaseOgImage, { BaseOgImagePropsType } from '../base-og-image';
import {
  apiResourceItemPathRead,
  apiResourceItemRead,
  humanFileSize,
} from '@/lib/server';
import { dataSiteBySubdomain } from '@/lib/data/site';
import { urlToPortalProd } from '@/init';

export const runtime = 'edge';
export const revalidate = 'force-cache';

export async function GET(
  req: NextRequest,
  { params: { paths } }: { params: { paths: string[] } }
) {
  const [subdomain, type, slug] = paths;
  const options: BaseOgImagePropsType = {
    req,
    title: '',
    description: process.env.NEXT_PUBLIC_MAIN_TITLE ?? '',
    images: [],
  };
  const isWww = subdomain === 'www';
  if (!isWww) {
    const site = await dataSiteBySubdomain(subdomain);
    if (site) {
      options.site = site;
      options.description = site.name;
    }
  }

  if (type === 'berita') {
    options.title = 'Berita';
    if (slug) {
      const item = isWww
        ? await apiResourceItemPathRead('news')
            .bySlug({
              paths: [slug],
            })
            .catch(() => null)
        : await apiResourceItemPathRead('web_news')
            .bySlug({
              paths: [slug],
            })
            .catch(() => null);

      if (item) {
        options.title = item.title;
        options.description = item.description;
        options.images = [item.image_cover.url];
        item.content.blocks.forEach((c) => {
          if (c.type === 'image') {
            options.images.push(c.data.file.url);
          }
        });
      }
    }
  } else if (type === 'layanan-publik') {
    options.title = 'Layanan Publik';
    if (slug) {
      const item = await apiResourceItemRead('public_services')
        .setQuery({
          filter: {
            slug: {
              _eq: slug,
            },
          },
        })
        .items({
          single: true,
        })
        .catch(() => null);

      if (item) {
        options.title = `${item.title} (Layanan Publik)`;
        options.description = item.description;
        options.images = item.images ? item.images.map((img) => img.url) : [];
      }
    }
  } else if (type === 'dokumen') {
    options.title = 'Dokumen';
    if (slug) {
      const item = await (isWww
        ? apiResourceItemRead('documents')
            .setQuery({
              filter: {
                slug: {
                  _eq: slug,
                },
              },
            })
            .items({
              single: true,
            })
        : apiResourceItemRead('organization_documents')
            .setQuery({
              filter: {
                slug: {
                  _eq: slug,
                },
              },
            })
            .items({
              single: true,
            })
      ).catch(() => null);

      if (item) {
        options.title = item.title;
        options.description = `Ukuran: ${humanFileSize(
          item.file.filesize,
          true,
          0
        )}, Jenis: ${item.file.type}`;
        options.customImage = (
          <div tw="flex w-full items-center justify-center flex-1 rounded-lg">
            <img
              tw={`h-full w-50% rounded-xl shadow-sm`}
              style={{ objectFit: 'cover' }}
              src={urlToPortalProd('/images/dokumen-file-icon.webp')}
            />
          </div>
        );
      }
    }
  }

  return BaseOgImage(options);
}
