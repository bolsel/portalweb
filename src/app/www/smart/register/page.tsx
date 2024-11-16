import { Metadata } from 'next';
import { apiClient, titleWithMainTitle } from '@/lib/server';
import PageWithJumbotron from '@/components/pages/with-jumbotron';
import { DForm } from './_Form';
import { triggerFlow } from '@directus/sdk';
import _ from 'lodash';
import { formConfig } from './base';
const pageTitle = 'Mendaftar Akun SmartBolsel';
const pageDescription =
  'Mendaftar akun untuk satu akses layanan publik pemerintahan Kabupaten Bolaang Mongondow Selatan';
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: titleWithMainTitle(pageTitle),
    description: pageDescription,
  };
}

export default async function RegisterSmartBolsel() {
  const smartDataDeps = (await apiClient({}).request(
    triggerFlow('GET', '78507413-cdbb-4dd2-9467-1f1c201cc8e4')
  )) as any;
  const organizationsSelect = _.mapValues(
    _.keyBy(_.sortBy(smartDataDeps.organizations, 'name'), 'id'),
    'name'
  );
  const jobTitlesSelect = _.mapValues(
    _.keyBy(_.sortBy(smartDataDeps.job_titles, 'name'), 'id'),
    'name'
  );
  const userTypesSelect = _.mapValues(
    _.keyBy(_.sortBy(smartDataDeps.user_types, 'code'), 'id'),
    (v) => `${v.code} - ${v.name}`
  );

  let formSendStatus = false;
  return (
    <PageWithJumbotron
      jumbotron={{
        title: pageTitle,
        subtitle: pageDescription,
        breadcrumb: [
          {
            label: 'Beranda',
            link: '/',
          },
          {
            label: 'Mendaftar SmartBolsel',
            link: '/smart/register',
            active: true,
          },
        ],
      }}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-[60%,40%]">
        <section className="lg:px-10 order-last lg:order-first">
          <DForm
            config={formConfig}
            deps={{
              ...smartDataDeps,
              organizationsSelect,
              userTypesSelect,
              jobTitlesSelect,
            }}
          />
        </section>
        <aside className="p-4 border border-gray-200 rounded-xl h-[fit-content] lg:sticky lg:top-[88px] mb-6 ">
          <ol className="px-4 list-disc text-gray-800 flex flex-col gap-2">
            <li>Email harus berstatus aktif untuk menerima informasi akun.</li>
            <li>Masukan Nama lengkap tanpa gelar</li>
            <li>Admin dari organisasi anda akan memverifikasi data anda.</li>
            <li>
              Setelah verifikasi selesai, anda akan menerima Email berisi
              informasi akun SmartBolsel anda.
            </li>
          </ol>
        </aside>
      </div>
    </PageWithJumbotron>
  );
}
