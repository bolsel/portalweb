import dynamic from 'next/dynamic';

const pages = {
  'not-found': dynamic(() => import('./not-found')),
  home: dynamic(() => import('./home/page')),
  berita: dynamic(() => import('./berita/page')),
  'berita/[slug]': dynamic(() => import('./berita/[slug]/page')),
  dokumen: dynamic(() => import('./dokumen/page')),
  'dokumen/[slug]': dynamic(() => import('./dokumen/[slug]/page')),
  'profil/[slug]': dynamic(() => import('./profil/[slug]/page')),
};
export default pages;
