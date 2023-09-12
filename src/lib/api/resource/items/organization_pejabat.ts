import {
  contentBlocksNormalizer,
  imageFileNormalizer,
} from '../../normalizer-helper';
import { createApiResource } from '../base';

export default createApiResource('organization_pejabat', {
  baseFields: [
    'id',
    'name',
    'jabatan',
    'nip',
    'profil',
    { image: ['*'] },
    { organization: ['id', 'name', 'slug'] },
  ],
  baseQuery: {},
  baseNormalizer(data) {
    return {
      ...data,
      image: data.image ? imageFileNormalizer(data.image) : null,
      profil: contentBlocksNormalizer(data.profil),
    };
  },
});
