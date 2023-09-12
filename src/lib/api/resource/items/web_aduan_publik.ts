import { createApiResource } from '../base';

export default createApiResource('web_aduan_publik', {
  baseFields: ['id', 'nama', 'email', 'hp', 'isi', 'date_created'],
  baseQuery: {},
  baseNormalizer: (data) => {
    return data;
  },
}).addPath('read', 'sendNew', (res) => ({ paths }) => {
  return { ok: 'ok' };
});
