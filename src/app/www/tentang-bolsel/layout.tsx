import Menu from './_menu';
import PageWithJumbotron from '../../../components/pages/with-jumbotron';
import { dataJsonLdOrganization } from '@/lib/data/jsonld';
import JsonLdRender from '@/components/jsonld-render';

export default function LayoutTentangBolselPage({ children, page }) {
  return (
    <PageWithJumbotron
      jumbotron={{
        title: 'Tentang Bolsel',
        subtitle: 'Ketahui tentang Bolaang Mongondow Selatan',
        breadcrumb: [
          {
            label: 'Beranda',
            link: '/',
          },
          {
            label: 'Tentang Bolsel',
            link: '/tentang-bolsel',
            active: true,
          },
        ],
      }}
    >
      <JsonLdRender data={dataJsonLdOrganization} />
      <div className="w-full grid grid-cols-1 xl:grid-cols-[268px,auto] gap-6">
        <aside className="p-4 w-full border border-gray-200 rounded-xl h-full lg:h-[fit-content]">
          <Menu />
        </aside>
        <div className="lg:px-10">{children}</div>
      </div>
    </PageWithJumbotron>
  );
}
