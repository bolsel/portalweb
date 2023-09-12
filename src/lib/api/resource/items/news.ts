import _ from 'lodash';
import { createApiResource } from '../base';
import {
  toDateStringNormalizer,
  imageFileNormalizer,
  contentBlocksNormalizer,
} from '../../normalizer-helper';
import { apiClient } from '../../instance';
import { updateItem } from '@directus/sdk';

export default createApiResource('news', {
  baseFields: [
    'id',
    'slug',
    'title',
    'description',
    'publish_date',
    'reporter',
    'editor',
    'view_count',
    'shared_count',
    { category: ['id', 'name', 'slug'] },
    { image_cover: ['*'] },
    {
      user_created: ['first_name', 'last_name', 'content_author_name'],
    },
    { user_updated: ['first_name', 'last_name', 'content_author_name'] },
  ],
  baseQuery: {
    sort: ['-publish_date'],
    filter: { status: { _eq: 'published' } },
  },
  baseNormalizer: (data) => {
    const user = `${data.user_created?.first_name} ${data.user_created?.last_name}`;
    const writer = data.user_created?.content_author_name ?? user;
    const reporter = data.reporter ?? writer;
    const editor = data.editor ?? writer;
    return {
      ..._.omit(data, 'user_updated', 'user_created'),
      image_cover: imageFileNormalizer(data.image_cover!),
      writer,
      reporter,
      editor,
      publish_date_date: new Date(data.publish_date),
      publish_date_format: toDateStringNormalizer(data.publish_date),
    };
  },
})
  .addPath('read', 'bySlug', (res) => ({ paths: [slug] }) => {
    if (!slug) res.errorThrow('Slug dibutuhkan.');
    return res.read.setQuery({ filter: { slug: { _eq: slug } } }).items({
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
  })
  .addPath(
    'read',
    'shareAndViewCount',
    (res) =>
      async ({ paths: [slug, update] }) => {
        if (!slug) res.errorThrow('Slug dibutuhkan.');
        if (!update) res.errorThrow('update type dibutuhkan.');
        return await res.read
          .clientOptions({ cache: 'no-cache' })
          .setQuery({
            filter: { slug: { _eq: slug } },
          })
          .items({
            single: true,
            normalizer: [
              ['id', 'view_count', 'shared_count'],
              async (data) => {
                const updateData: any =
                  update === 'share'
                    ? { shared_count: data.shared_count + 1 }
                    : { view_count: data.view_count + 1 };
                return await apiClient({ cache: 'no-cache' }).request(
                  updateItem(res.collection, data.id, updateData, {
                    fields: ['view_count', 'shared_count'],
                  })
                );
              },
            ],
          });
      }
  );
