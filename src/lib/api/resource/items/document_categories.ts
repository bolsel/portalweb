import { createApiResource } from '../base';

export default createApiResource('document_categories', {
  baseFields: ['id', 'name', 'slug', 'description'],
  baseQuery: {},
  baseNormalizer(data) {
    return data;
  },
});
