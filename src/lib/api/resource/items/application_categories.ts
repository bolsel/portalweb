import { createApiResource } from '../base';

export default createApiResource('application_categories', {
  baseFields: ['id', 'name', 'slug'],
  baseQuery: {},
  baseNormalizer(data) {
    return data;
  },
});
