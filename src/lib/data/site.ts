import { BaseIconNamesType } from '@/components/icons/base-icon';
import { apiResourceItemPathRead } from '../server';
import { TWebsiteItemBySubdomain, TWebsiteMenu } from '@/types';
import { urlToWww } from '@/init';
import _ from 'lodash';

export async function dataSiteBySubdomain(subdomain: string) {
  return await apiResourceItemPathRead('websites')
    .bySubdomain({
      paths: [subdomain],
    })
    .catch(() => null);
}

export async function dataSiteBeritaBySlug(slug: string) {
  return await apiResourceItemPathRead('web_news')
    .bySlug({ paths: [slug] })
    .catch(() => null);
}

export async function dataSitePageBySlug(websiteId: string, slug: string) {
  return await apiResourceItemPathRead('web_pages')
    .bySlug({ paths: [websiteId, slug] })
    .catch(() => null);
}

export function dataSiteMenuProfilItems(
  site: TWebsiteItemBySubdomain
): TWebsiteMenu['items'] {
  return [
    {
      title: 'Sekilas',
      link: '/profil/sekilas',
      description: `Sekilas tentang ${site.organization.name}`,
      icon: 'info',
    },
    {
      title: 'Visi Misi',
      link: '/profil/visi-misi',
      description: `Visi & Misi ${site.organization.name}`,
      icon: 'visi-misi',
    },
    {
      title: 'Struktur Organisasi',
      link: '/profil/struktur-organisasi',
      description: `Struktur Organisasi ${site.organization.name}`,
      icon: 'sitemap',
    },
    {
      title: 'Profil Pejabat',
      link: '/profil/pejabat',
      description: `Profil pejabat ${site.organization.name}`,
      icon: 'users',
    },
  ];
}
export function dataSiteMenuDokumenItems(
  site: TWebsiteItemBySubdomain
): TWebsiteMenu['items'] {
  return [
    {
      title: 'Semua Dokumen',
      link: '/dokumen',
      description: `Informasi Dokumen ${site.organization.name}`,
      icon: 'document-file',
    },
    {
      title: 'Dokumen Perencanaan',
      link: '/dokumen?kategori=dokumen-perencanaan',
      description: `Dokumen Perencanaan ${site.organization.name}`,
      icon: 'document-file',
    },
    {
      title: 'Laporan Keuangan',
      link: '/dokumen?kategori=laporan-keuangan',
      description: `Laporan Keuangan ${site.organization.name}`,
      icon: 'document-file',
    },
    {
      title: 'Dokumen lainnya',
      link: '/dokumen?kategori=lainnya',
      description: `Dokumen lainnya ${site.organization.name}`,
      icon: 'document-file',
    },
  ];
}
export async function dataSiteMenu(site: TWebsiteItemBySubdomain) {
  const modules: string[] = site.modules ?? [];

  const menuItems: TWebsiteMenu[] = [
    {
      title: 'Profil',
      link: '/profil',
      items: dataSiteMenuProfilItems(site),
    },
    {
      title: 'Berita',
      link: '/berita',
      items: [
        {
          title: 'Berita Terbaru',
          link: '/berita',
          description: `Berita terbaru ${site.organization.name}`,
          icon: 'newspaper',
        },
        {
          title: 'Portal Bolsel',
          link: urlToWww('/berita'),
          description: 'Lihat berita utama Portal Bolsel',
          icon: 'newspaper',
        },
      ],
    },
    {
      title: 'Dokumen',
      link: '/dokumen',
      items: dataSiteMenuDokumenItems(site),
    },
  ];
  const menusData = await apiResourceItemPathRead('web_menu')
    .siteMenu({ paths: [site.id] })
    .catch((e) => null);

  if (menusData) {
    _.forEach(menusData, (menu) => {
      menuItems.push({
        title: menu.title,
        link: `/menu/${menu.slug}`,
        items: _.map(_.sortBy(menu.pages, 'sort'), (page) => {
          return {
            title: page.title,
            link: `/page/${page.slug}`,
            description: page.description ?? '',
            icon: 'newspaper',
          };
        }),
      });
    });
  }
  if (modules.indexOf('aduan_publik') >= 0) {
    menuItems.push({
      title: 'Aduan Publik',
      link: '/aduan-publik',
    });
  }

  return menuItems;
}
