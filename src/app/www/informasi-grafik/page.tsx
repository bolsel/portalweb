import PageWithJumbotron from '@/components/pages/with-jumbotron';
import Lists from './_Lists';
import { Metadata } from 'next';
import { titleWithMainTitle } from '@/lib/server';

export const metadata: Metadata = {
  title: titleWithMainTitle('Informasi Grafik'),
  description: titleWithMainTitle('Lihat semua informasi grafik'),
};
export default function Page() {
  return (
    <PageWithJumbotron
      jumbotron={{
        title: 'Informasi Grafik',
        subtitle: 'Lihat semua informasi grafik',
        breadcrumb: [
          {
            label: 'Beranda',
            link: '/',
          },
          {
            label: 'Informasi Grafik',
            link: '/informasi-grafik',
            active: true,
          },
        ],
      }}
    >
      <Lists />
    </PageWithJumbotron>
  );
}
