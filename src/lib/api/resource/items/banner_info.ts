import { imageFileNormalizer } from '../../normalizer-helper';
import { createApiResource } from '../base';

export default createApiResource('banner_info', {
  baseFields: ['id', 'title', 'link', { image: ['*'] }],
  baseQuery: { sort: ['sort'], filter: { status: { _eq: 'published' } } },
  baseNormalizer(data) {
    return {
      ...data,
      image: imageFileNormalizer(data.image),
    };
  },
});
