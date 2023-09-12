import {
  fileObjectNormalizer,
  toDateStringNormalizer,
} from '../../normalizer-helper';
import { createApiResource } from '../base';

export default createApiResource('organization_documents', {
  baseFields: [
    'id',
    'description',
    'publish_date',
    'title',
    'slug',
    'category',
    'date_updated',
    { file: ['*'] },
  ],
  baseQuery: {
    filter: { status: { _eq: 'published' } },
    sort: ['-publish_date'],
  },
  baseNormalizer(data) {
    return {
      ...data,
      publish_date_format: toDateStringNormalizer(data.publish_date),
      date_updated_format: data.date_updated
        ? toDateStringNormalizer(data.date_updated)
        : null,
      file: fileObjectNormalizer(data.file),
    };
  },
});
