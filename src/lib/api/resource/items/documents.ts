import {
  imageFileNormalizer,
  toDateStringNormalizer,
} from '../../normalizer-helper';
import { createApiResource } from '../base';

export default createApiResource('documents', {
  baseFields: [
    'id',
    'description',
    'publish_date',
    'title',
    'slug',
    { category: ['id', 'name', 'slug'] },
    { file: ['*'] },
    'date_updated',
  ],
  baseQuery: {
    filter: { status: { _eq: 'published' } },
    sort: ['-publish_date'],
  },
  baseNormalizer(data) {
    return {
      ...data,
      file: { ...imageFileNormalizer(data.file), type: data.file.type },
      publish_date_format: toDateStringNormalizer(data.publish_date),
      date_updated_format: data.date_updated
        ? toDateStringNormalizer(data.date_updated)
        : '',
    };
  },
});
