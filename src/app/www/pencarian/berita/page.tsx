import PageWithJumbotron from '@/components/pages/with-jumbotron';
import DocumentLists from '../_components/document-lists';
import NewsLists from '../_components/news-lists';
import SearchInput from '@/components/input/search-input';
import { titleWithMainTitle } from '@/lib/server';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: titleWithMainTitle('Pencarian Berita'),
};

export default async function Page({
  searchParams: { q: query },
}: {
  searchParams: { q: string };
}) {
  return (
    <PageWithJumbotron
      jumbotron={{
        title: 'Pencarian Berita',
        subtitle: 'Temukan informasi',
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
            label: 'Berita',
            link: ``,
            active: true,
          },
        ],
      }}
    >
      <section className="border-b flex flex-col w-full items-center mb-5">
        <h2 className="font-lora text-center md:text-left text-2xl font-bold text-blue-gray-700">
          Menampilkan hasil pencarian berita:{' '}
          <strong className="text-primary-700">{query}</strong>
        </h2>
        <div className="my-5 w-full max-w-lg">
          <SearchInput currentValue={query} pathSearch="/pencarian/berita" />
        </div>
      </section>

      <section className="w-full mt-10">
        <NewsLists search={query} full />
      </section>
    </PageWithJumbotron>
  );
}
