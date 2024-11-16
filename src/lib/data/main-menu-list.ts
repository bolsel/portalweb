import { apiResourceItemPathRead, apiResourceItemRead } from '@/lib/api/index';

export default async function dataMainMenuList() {
  const newsCategories = await apiResourceItemPathRead('news_categories').items(
    {
      limit: -1,
    }
  );
  const publicServices = await apiResourceItemRead('public_services')
    .setQuery({ limit: 5 })
    .items({
      normalizer: [['id', 'title', 'slug', 'description'], (data) => data],
    });
  const mainMenu = [
    {
      title: 'Berita Bolsel',
      link: '/berita',
      items: newsCategories.map((d) => ({
        title: d.name,
        link: `/berita/kategori/${d.slug}`,
        description: d.description,
        icon: d.slug ?? 'menuDefault',
      })),
    },
    {
      title: 'Profil Bolsel',
      items: [
        {
          title: 'Tentang Bolsel',
          link: `/tentang-bolsel/visi-misi`,
          description: 'Cari tahu selengkapnya tentang Bolsel',
          icon: 'informasi',
        },
        {
          title: 'Arsip dan Dokumen',
          link: `/dokumen`,
          description: 'Akses dan unduh dokumen resmi dari Pemkab Bolsel',
          icon: 'folder-dokumen',
        },
        {
          title: 'Aplikasi',
          link: `/aplikasi`,
          description: 'Informasi tentang daftar Aplikasi yang ada di Bolsel',
          icon: 'apps',
        },
        {
          title: 'Informasi Grafik',
          link: `/informasi-grafik`,
          description: 'Lihat Informasi grafik resmi dari Pemkab Bolsel',
          icon: 'image',
        },
        {
          title: 'Jaringan Dokumentasi dan Informasi Hukum',
          link: 'https://jdih.bolselkab.go.id',
          description: 'Layanan transparansi informasi produk hukum',
          icon: 'folder-dokumen',
        },
        {
          title: 'Layanan Pengadaan Secara Elektronik',
          link: 'http://lpse.bolselkab.go.id',
          description:
            'Sistem pengadaan berbasis E-Procurement (SPSE) Pemkab Bolsel',
          icon: 'folder-dokumen',
        },
      ],
    },
    {
      title: 'Layanan Publik',
      link: '/layanan-publik',
      items: [
        ...(publicServices
          ? publicServices.map((d) => ({
              title: d.title,
              link: `/layanan-publik/${d.slug}`,
              description: d.description,
              icon: 'layanan-publik',
            }))
          : []),
        ...[
          {
            title: 'Semua Layanan Publik',
            link: '/layanan-publik',
            icon: 'menu-default',
            description: 'Lihat daftar layanan publik lengkap',
          },
        ],
      ],
    },
    {
      title: 'Smart Bolsel',
      items: [
        {
          title: 'Mendaftar',
          link: `/smart/register`,
          description: 'Buat akun SmartBolsel',
          icon: 'app',
        },
        {
          title: 'Bolsel Mail',
          link: 'https://mail.bolselkab.go.id',
          description:
            'Layanan Email yang dapat diakses seluruh ASN Pemkab Bolsel',
          icon: 'app',
        },
        {
          title: 'Cloud Bolsel',
          link: 'https://cloud.bolselkab.go.id',
          description:
            'Layanan Penyimpanan Cloud dan Layanan Kolaborasi SmartBolsel.',
          icon: 'app',
        },
      ],
    },
  ];
  return mainMenu;
}
