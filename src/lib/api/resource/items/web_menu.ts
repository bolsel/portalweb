import _ from 'lodash';
import { createApiResource } from '../base';

export default createApiResource('web_menu', {
  baseFields: [
    'id',
    'slug',
    'title',
    'status',
    'title',
    'sort',
    { pages: ['id', 'title', 'status', 'slug', 'sort'] },
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
    return data;
  },
}).addPath('read', 'siteMenu', (res) => async ({ paths: [websiteId] }) => {
  if (!websiteId) res.errorThrow('Website dibutuhkan.');
  return await res.read
    .clientOptions({ cache: 'no-cache' })
    .setQuery({
      filter: { website: { _eq: websiteId } },
      limit: -1,
    })
    .items({
      normalizer: [
        [
          'id',
          'title',
          'slug',
          'sort',
          { pages: ['id', 'slug', 'title', 'sort', 'description'] },
        ],
        (data) => {
          return data;
        },
      ],
    });
});
