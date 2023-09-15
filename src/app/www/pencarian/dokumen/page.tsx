import PageWithJumbotron from '@/components/pages/with-jumbotron';
import DocumentLists from '../_components/document-lists';
import SearchInput from '@/components/input/search-input';
import { titleWithMainTitle } from '@/lib/server';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: titleWithMainTitle('Pencarian Dokumen'),
};

export default async function Page({
  searchParams: { q: query },
}: {
  searchParams: { q: string };
}) {
  return (
    <PageWithJumbotron
      jumbotron={{
        title: 'Pencarian Dokumen',
        subtitle: 'Temukan informasi dokumen',
        breadcrumb: [
          {
            label: 'Beranda',
            link: '/',
          },
          {
            label: 'Pencarian',
            link: `/pencarian/?q=${query}`,
          },
          {
            label: 'Dokumen',
            link: ``,
            active: true,
          },
        ],
      }}
    >
      <section className="border-b flex flex-col w-full items-center mb-5">
        <h2 className="font-lora text-center md:text-left text-2xl font-bold text-blue-gray-700">
          Menampilkan hasil pencarian dokumen:{' '}
          <strong className="text-primary-700">{query}</strong>
        </h2>
        <div className="my-5 w-full max-w-lg">
          <SearchInput currentValue={query} pathSearch="/pencarian/dokumen" />
        </div>
      </section>

      <section className="w-full mt-10">
        <DocumentLists search={query} full />
      </section>
    </PageWithJumbotron>
  );
}
