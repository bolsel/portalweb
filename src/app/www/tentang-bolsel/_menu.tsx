'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Menu() {
  const pathName = usePathname();
  const menus = [
    {
      title: 'Tentang Bolsel',
      items: [
        {
          label: 'Visi Misi',
          path: '/tentang-bolsel/visi-misi',
        },
        { label: 'Logo Daerah', path: '/tentang-bolsel/logo-daerah' },
      ],
    },
  ];

  return menus.map((menu, i) => {
    return (
      <div key={i}>
        <p className="text-sm font-bold text-gray-800 mb-5">{menu.title}</p>
        <ul>
          {menu.items.map((menu, subI) => {
            return (
              <li key={subI} className="mb-5 ml-7">
                <Link
                  href={menu.path}
                  className={clsx(
                    'text-sm text-gray-700 hover:text-primary-700',
                    {
                      'font-bold text-primary-700': menu.path === pathName,
                    }
                  )}
                >
                  {menu.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  });
}
