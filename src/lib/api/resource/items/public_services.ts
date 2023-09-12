import {
  imageFileNormalizer,
  toDateStringNormalizer,
} from '../../normalizer-helper';
import { createApiResource } from '../base';

export default createApiResource('public_services', {
  baseFields: [
    'id',
    'title',
    'description',
    'slug',
    'links',
    'social_media',
    'address',
    'email',
    'phones',
    'operational_hours',
    'type',
    'informations',
    'date_updated',
    'date_created',
    { images: [{ image: ['*'] }] },
    { logo: ['*'] },
    { organization: ['id', 'name', 'slug'] },
  ],
  baseQuery: { filter: { status: { _eq: 'published' } } },
  baseNormalizer(data) {
    return {
      ...data,
      links: data.links ? data.links : [],
      // @ts-ignore
      logo: data.logo ? imageFileNormalizer(data.logo) : null,
      date_updated_format: data.date_updated
        ? toDateStringNormalizer(data.date_updated)
        : null,
      images: data.images
        ? // @ts-ignore
          data.images.map((image) => imageFileNormalizer(image.image))
        : [],
    };
  },
});
