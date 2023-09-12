import { imageFileNormalizer } from '../../normalizer-helper';
import { createApiResource } from '../base';

export default createApiResource('applications', {
  baseFields: [
    'id',
    'link',
    'sort',
    'title',
    'links',
    'social_media',
    'description',
    'slug',
    { logo: ['*'] },
    { categories: [{ category: ['id', 'name', 'slug'] }] },
    { organization: ['id', 'name', 'status'] },
  ],
  baseQuery: {
    filter: { status: { _eq: 'published' } },
  },
  baseNormalizer(data) {
    return {
      ...data,
      logo: data.logo ? imageFileNormalizer(data.logo) : null,
      categories: data.categories
        ? data.categories?.map(
            (category) =>
              category.category as { id: string; name: string; slug: string }
          )
        : [],
    };
  },
});
