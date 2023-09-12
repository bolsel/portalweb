import { apiResourceItemPathRead } from '@portalweb/api/server';
import { UIContentBlocks } from '@portalweb/ui';
import Image from 'next/image';

export default async function Pejabat({ organizationId }) {
  const pejabat = await apiResourceItemPathRead('organization_pejabat')
    .items({
      filter: {
        organization: { _eq: organizationId },
      },
    })
    .catch(() => null);
  if (!pejabat) return <div>Belum ada data.</div>;

  return (
    <div className="flex flex-col divide-y gap-4 list-none">
      {pejabat ? (
        pejabat.map((item, index) => {
          return (
            <div key={index} className="group flex flex-col">
              <div className="flex items-start p-3 gap-4 ">
                <div className="w-24 h-24">
                  {item.image ? (
                    <Image
                      className="mask mask-squircle w-full h-full"
                      src={item.image.url}
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="italic uppercase font-heading">
                    {item.jabatan}
                  </div>
                  <div className="text-lg font-bold font-content-title">
                    {item.name}
                  </div>
                  <div>NIP: {item.nip}</div>
                </div>
              </div>
              {item.profil && item.profil.blocks && (
                <div className=" prose max-w-none">
                  <div className="collapse">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title w-full p-0 m-0">
                      <button className="btn btn-outline ml-3 btn-sm btn-primary normal-case">
                        Selengkapnya
                      </button>
                    </div>
                    <div className="collapse-content w-full bg-base-200 peer-checked:p-2 rounded-box">
                      {item.profil ? (
                        <UIContentBlocks {...item.profil} />
                      ) : null}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div>Belum ada data</div>
      )}
    </div>
  );
}
