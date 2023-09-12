import { titleWithMainTitle } from '@/lib/server';
import Lists from './_Lists';
import { Metadata } from 'next';
import PageWithJumbotron from '@/components/pages/with-jumbotron';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: titleWithMainTitle('Layanan Publik'),
    description: 'Cari tahu Informasi layanan publik yang ada di Bolsel',
  };
}
export default async function MainLayananPublikPage() {
  return (
    <PageWithJumbotron
      jumbotron={{
        title: 'Layanan Publik',
        subtitle: 'Cari tahu informasi layanan publik yang ada di Bolsel',
        breadcrumb: [
          {
            label: 'Beranda',
            link: '/',
          },
          {
            label: 'Layanan Publik',
            link: '/layanan-publik',
            active: true,
          },
        ],
      }}
    >
      <div className="w-full grid grid-cols-1">
        <Lists />
      </div>
    </PageWithJumbotron>
  );
}
