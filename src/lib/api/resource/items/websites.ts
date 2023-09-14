import { ROOT_DOMAIN } from '@/init';
import { createApiResource } from '../base';

export default createApiResource('websites', {
  baseFields: [
    'id',
    'subdomain',
    'domain_alias',
    'name',
    'modules',
    { organization: ['id', 'name', 'slug'] },
  ],
  baseQuery: {
    filter: {
      status: { _eq: 'published' },
    },
  },
  baseNormalizer(data) {
    return { ...data, domain: `${data.subdomain}.${ROOT_DOMAIN}` };
  },
}).addPath('read', 'bySubdomain', (res) => {
  return ({ paths: [subdomain] }) => {
    if (!subdomain) throw new Error('subdomain is required');
    return res.read
      .setQuery({
        filter: { subdomain: { _eq: subdomain } },
      })
      .items({
        single: true,
      });
  };
});
