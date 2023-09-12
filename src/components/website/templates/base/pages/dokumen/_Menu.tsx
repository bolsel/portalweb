'use client';
import BaseIcon from '@/components/icons/base-icon';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Menu({ menuList }) {
  const searchParams = useSearchParams();
  const kategori = searchParams.get('kategori');
  const current = kategori ? `/dokumen?kategori=${kategori}` : '/dokumen';
  return (
    <ul
      tabIndex={0}
      className="dropdown-content w-full menu bg-base-100  p-2 rounded-box shadow-md border-primary border-1 gap-1"
    >
      {menuList?.map((m, i) => {
        return (
          <li key={i}>
            <Link
              href={m.link}
              className={clsx({ active: m.link === current })}
            >
              <BaseIcon
                className="w-5 h-5"
                icon={m.icon}
                fallback="menu-default"
              />
              {m.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
