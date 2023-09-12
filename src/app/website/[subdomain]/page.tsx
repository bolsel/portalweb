import { TWebsitePageProps } from '@/types';
import { genMetaSiteIndex } from '@/lib/server';
import SitePage from '@/components/website/page';

export const generateMetadata = genMetaSiteIndex;

export default function Page(props: TWebsitePageProps) {
  return (
    <SitePage
      page={{
        ...props,
        name: 'home',
        title: '{{site.name}}',
        subTitle: 'Pemerintah Kabupaten Bolaang Mongondow Selatan',
      }}
    />
  );
}
