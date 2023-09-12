import { contentBlocksNormalizer } from '../../normalizer-helper';
import { createApiResource } from '../base';

export default createApiResource('organizations', {
  baseFields: ['id', 'name', 'slug'],
  baseQuery: {
    filter: { status: { _eq: 'published' } },
  },
  baseNormalizer(data) {
    return data;
  },
}).addPath('read', 'infoBySlug', (res) => ({ paths: [slug] }) => {
  if (!slug) res.errorThrow('Slug is required');
  return res.read
    .setQuery({
      filter: { slug: { _eq: slug } },
    })
    .items({
      single: true,
      normalizer: [
        [
          'id',
          'name',
          'slug',
          'address',
          'phone',
          'location_point',
          'email',
          'social_media',
          'sekilas',
          'visi',
          'misi',
          'structure',
        ],
        (data) => {
          return {
            ...data,
            social_media: data.social_media ?? [],
            sekilas: contentBlocksNormalizer(data.sekilas),
            visi: contentBlocksNormalizer(data.visi),
            misi: contentBlocksNormalizer(data.misi),
            structure: contentBlocksNormalizer(data.structure),
          };
        },
      ],
    });
});
