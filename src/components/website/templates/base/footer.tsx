import { apiResourceItemPathRead } from '@/lib/server';
import { SiteContextType, useSiteContext } from '../../provider';
import BaseIcon, { BaseIconNamesType } from '@/components/icons/base-icon';

export default async function Footer({
  site,
}: {
  site: SiteContextType['site'];
}) {
  const orgInfo = await apiResourceItemPathRead('organizations').infoBySlug({
    paths: [site.organization.slug],
  });

  return (
    <footer>
      <div className="bg-primary px-5 py-8">
        <div className="ui-container">
          <div className="min-w-0 grid grid-cols-1 md:grid-cols-2 lg:justify-between gap-6 text-white">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <BaseIcon icon="map-pin" className="py-1 w-8 h-8" />
                <div className="flex flex-col gap-1">
                  <p className="font-roboto font-bold leading-7">Alamat</p>
                  <div className="flex flex-col text-sm leading-6">
                    <p>{orgInfo.address}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BaseIcon icon="mail" className="py-1 w-8 h-8" />
                <div className="flex flex-col gap-1">
                  <p className="font-roboto font-bold leading-7">Surel</p>
                  <a
                    href={`mailto:${orgInfo.email}`}
                    className="text-sm leading-6"
                  >
                    {orgInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BaseIcon icon="phone" className="py-1 w-8 h-8" />
                <div className="flex flex-col gap-1">
                  <p className="font-roboto font-bold leading-7">Telepon</p>
                  <p>{orgInfo.phone}</p>
                </div>
              </div>
              {orgInfo.social_media.length ? (
                <div className="flex items-start gap-3">
                  <BaseIcon icon="tabler-social" className="py-1 w-8 h-8" />
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">Sosial Media</p>
                    <div className="w-full flex justify-between md:justify-start gap-4">
                      {orgInfo.social_media.map((s, i) => {
                        const _icon = `logo-${s.name}` as BaseIconNamesType;
                        return (
                          <a
                            key={i}
                            href={s.link}
                            target="_blank"
                            title={s.name}
                            rel="noreferrer"
                            className="hover:bg-primary-500 p-2 flex justify-center items-center rounded-md border border-white border-opacity-20"
                          >
                            <BaseIcon
                              icon={_icon}
                              fallback="link"
                              className="w-6 h-6"
                            />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="w-full">
              <div className="flex flex-col gap-1">
                <div className="w-full h-72">
                  {orgInfo.location_point ? (
                    <iframe
                      title="Lokasi Kantor"
                      className="w-full h-full rounded-lg"
                      width="100%"
                      src={`https://maps.google.com/maps?width=600&height=400&hl=en&q=${orgInfo.location_point.coordinates[1]},${orgInfo.location_point.coordinates[0]}&t=k&z=17&ie=UTF8&iwloc=B&output=embed`}
                    ></iframe>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary-dark p-3 text-white">
        <div className="flex flex-col items-center justify-center">
          <div>&copy; 2023 {orgInfo.name}</div>
          <div className="text-xs">
            PEMERINTAH KABUPATEN BOLAANG MONGONDOW SELATAN
          </div>
        </div>
      </div>
    </footer>
  );
}
