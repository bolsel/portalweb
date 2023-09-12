import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visi Misi Pemkab Bolsel',
  description: 'Visi & Misi Pemerintah Kabupaten Bolaang Mongondow Selatan',
};

export default function Page() {
  return (
    <section>
      <h2 className="font-lora font-bold text-primary-700 text-[20px] md:text-4xl text-center md:text-left mb-8 leading-9 md:leading-[56px] px-4 md:px-0">
        Visi Misi
        <br />
        Pemerintah Kabupaten Bolaang Mongondow Selatan
      </h2>

      <div className="grid grid-cols-1 items-center px-0 md:px-6 lg:px-8 mb-8 md:gap-8 lg:gap-12">
        <blockquote className="p-4 md:p-0 col-span-2 md:col-span-1">
          <h3 className="font-lora font-bold text-primary-700 text-[28px] mb-4">
            Visi
          </h3>
          <q className="font-bold">
            Terwujudnya Kabupaten Bolaang Mongondow Selatan yang Bersatu,
            Berdaulat, Mandiri, Sejahtera dan Berkepribadian dengan Semangat
            Gotong Royong yang Berdasarkan Pancasila
          </q>
        </blockquote>
      </div>
      <div className="bg-gray-100 p-4 md:p-6 lg:p-8 rounded-2xl mb-8">
        <h3 className="font-lora font-bold text-primary-700 text-2xl md:text-[28px] mb-4">
          Misi
        </h3>
        <ol className="list-decimal px-4 md:px-10">
          <li>
            Meningkatkan Nilai - Nilai Religius dan Bersatu Memelihara Toleransi
            Antar Umat Beragama Yang Berkearifan Lokal Berdasarkan Pancasila.
          </li>
          <li>Meningkatkan Pembangunan Kewilayahan Yang Berdaulat.</li>
          <li>
            Meningkatkan Kapasitas Ekonomi Untuk Kesejahteraan Masyarakat Yang
            Mandiri dan Berwawasan Lingkungan.
          </li>
          <li>
            Meningkatkan Pelayanan Publik Berbasis Teknologi Informasi dan
            Inovasi Melalui Tata Kelola Pemerintahan Yang Baik Dan Bersih.
          </li>
          <li>
            Meningkatkan Sumberdaya Manusia Yang Berkepribadian Dan Berbudaya
            Serta Berdaya Saing.
          </li>
        </ol>
      </div>
    </section>
  );
}
