'use client';
import { useSearchParams } from 'next/navigation';
import { siteMenuDokumenItems } from '../../../components/layout/site/menu';

export default function Description({ site }) {
  const searchParams = useSearchParams();
  const kategori = searchParams.get('kategori');
  const menuList = siteMenuDokumenItems(site);
  const menu = kategori
    ? menuList?.find((m) => m.link === `/dokumen?kategori=${kategori}`)
    : null;
  return (
    <>
      {menu
        ? menu.description
        : `Informasi dokumen pada ${site.organization.name}`}
    </>
  );
}
