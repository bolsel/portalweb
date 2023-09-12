import { imageFileNormalizer } from '../../normalizer-helper';
import { createApiResource } from '../base';

export default createApiResource('grafik_info', {
  baseFields: ['id', 'title', 'publish_date', { image: ['*'] }],
  baseQuery: { sort: ['-publish_date'] },
  baseNormalizer(data) {
    return {
      ...data,
      image: imageFileNormalizer(data.image),
    };
  },
});
