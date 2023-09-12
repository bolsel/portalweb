import { createApiResource } from '../base';

export default createApiResource('news_categories', {
  baseFields: ['id', 'name', 'slug', 'description'],
  baseQuery: {},
  baseNormalizer(data) {
    return data;
  },
});
