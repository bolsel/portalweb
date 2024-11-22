import _ from 'lodash';
import { createApiResource } from '../base';
import {
  imageFileNormalizer,
  contentBlocksNormalizer,
} from '../../normalizer-helper';

export default createApiResource('web_pages', {
  baseFields: [
    'id',
    'slug',
    'title',
    'description',
    'sort',
    'menu',
    { image_cover: ['*'] },
    { website: ['id', 'name', 'subdomain'] },
    {
      user_created: ['first_name', 'last_name', 'content_author_name'],
    },
    { user_updated: ['first_name', 'last_name', 'content_author_name'] },
    'date_updated',
    'date_created',
  ],
  baseQuery: {
    sort: ['sort'],
    filter: { status: { _eq: 'published' } },
  },
  baseNormalizer: (data) => {
    return {
      ..._.omit(data, 'user_updated', 'user_created'),
      image_cover: data.image_cover
        ? imageFileNormalizer(data.image_cover!)
        : null,
    };
  },
}).addPath('read', 'bySlug', (res) => ({ paths: [websiteId, slug] }) => {
  if (!websiteId) res.errorThrow('Website dibutuhkan.');
  if (!slug) res.errorThrow('Slug dibutuhkan.');
  return res.read
    .setQuery({
      filter: {
        website: { _eq: websiteId },
        slug: { _eq: slug },
      },
    })
    .items({
      normalizer: [
        [...res.baseFields, 'content'],
        (data) => {
          return {
            ...res.baseNormalizer(data),
            content: contentBlocksNormalizer(data.content),
          };
        },
      ],
      single: true,
    });
});
