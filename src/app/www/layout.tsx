import dataMainMenuList from '@/lib/data/main-menu-list';
import Header from './_components/header';
import './layout.css';
import { Provider } from './provider';
import { apiClient } from '@/lib/api';
import { readSingleton } from '@directus/sdk';
import Footer from './_components/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    process.env.NEXT_PUBLIC_MAIN_TITLE ??
    'Pemerintah Kabupaten Bolaang Mongondow Selatan',
  description: 'Portal Resmi Pemerintah Kabupaten Bolaang Mongondow Selatan',
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuList = await dataMainMenuList();
  const settings = await apiClient().request(
    readSingleton('portal_web_settings')
  );

  return (
    <Provider value={{ menuList, settings }}>
      <Header />
      {children}
      <Footer />
    </Provider>
  );
}
