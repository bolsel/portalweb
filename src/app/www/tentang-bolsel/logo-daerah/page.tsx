import { urlToPortal } from '@/init';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Logo Bolsel',
  description: 'Informasi Logo Pemerintah Kabupaten Bolaang Mongondow Selatan',
};

export default function Page() {
  const maknaList = [
    {
      text: 'Gambar bintang persegi lima bercahaya terang menggambarkan Harapan masyarakat Bolaang Mongondow Selatan kedepan akan senantiasa hadirnya sosok pemimpin yang jujur, adil dan amanah yang kelak akan membawa negeri ini menjadi negeri "Baldatun thayyibatun warabbun ghafur" di bawah lindungan Maha Besar Tuhan.',
    },
    {
      text: 'Gambar tiga buah bukit berwarna hijau melambangkan 3 (tiga) gunung tertinggi di Bolaang Mongondow Selatan, Gunung sebagaimana dimaksud adalah Gunung Bonde, Gunung Mongoladia dan Gunung Soputa, 3 (tiga) Gunung tersebut merupakan pasak alam yang menggambarkan sinergitas dari tiga kekuatan besar masyarakat Bolaang Mongondow Selatan yakni Kerja keras, harapan, dan doa untuk mewujudkan masyarakat yang adil, makmur, mampu bersaing dan mandiri dengan modal potensi alam yang ada.',
    },
    {
      text: 'Gambar Padi dan Kapas adalah lambang sandang dan pangan sebagai kebutuhan masyarakat sehari-hari, terpaut dengan rantai besi, gambar padi berjumlah 21 butir, gambar kapas 7 buah dan rantai besi 8 buah melambangkan tanggal 21 Juli 2008, sebagai tanggal disahkannya Undang-Undang Nomor 30 Tahun 2008 tentang Pembentukan Kabupaten Bolaang Mongondow Selatan di Provinsi Sulawesi Utara.',
    },
    {
      text: 'Gambar 3 (tiga) Buah Pagangga atau Pahangga yang terikat oleh rantai besi yang terbuka pada setiap ujungnya melambangkan bahwa terdapat 3 (tiga) Suku besar di Bolaang Mongondow Selatan yaitu Bolango, Gorontalo dan Mongondow, akan tetapi masih membuka diri untuk masuknya etnis dan suku dari manapun.',
    },
    {
      text: 'Gambar laut membiru dan hamparan sawah yang menguning melambangkan konsenstrasi mata pencaharian penduduk Bolaang Mongondow Selatan sebagai petani dan nelayan.',
    },
    {
      text: 'Gambar Nyiur melambangkan hasil produksi pertanian yang cukup besar masyarakat Kabupaten Bolaang Mongondow Selatan.',
    },
    {
      text: 'Gambar Keris dan Perisai menggambarkan kesiapan masyarakat Bolaang Mongondow Selatan dalam mengawal, membelah,dan mengamankan kebijakan yang berpihak kepada rakyat.',
    },
    {
      text: 'Pita Putih Bertuliskan "<strong>BOLAANG MONGONDOW SELATAN</strong>" Memuat arti Pesan Moral Masyarakat Bolaang Mongondow Selatan bahwa setiap pemimpin bersikap ikhlas, jujur dan transparan dalam kepemimpinannya, dengan harapan kelak negeri ini tumbuh dan maju dibawah lindungan dan berkat Tuhan Yang Maha Kuasa.',
    },
    {
      text: 'Warna Kuning Keemasan disisi 5 (lima) Logo melambangkan potensi pertambangan yang cukup besar yang terdapat di Bolaang Mongondow Selatan.',
    },
  ];
  return (
    <section>
      <div className="mb-9">
        <h2 className="font-lora font-bold text-primary-700 text-[28px] md:text-4xl text-center md:text-left leading-9 md:leading-[56px] mb-4">
          Logo Daerah
        </h2>
        <p className=" leading-6 text-blue-gray-800 mb-8">
          Logo Daerah adalah panji kebesaran dan simbol kultural bagi masyarakat
          daerah yang mencerminkan kekhasan daerah Kabupaten Bolaang Mongondow
          Selatan dalam Negara Kesatuan Republik Indonesia
        </p>
        <p className=" leading-6 text-blue-gray-800 mb-8">
          Bentuk Logo Daerah Kabupaten Bolaang Mongondow Selatan adalah
          berbentuk persegi lima menggambarkan lima dasar Pancasila sebagai
          pandangan hidup bangsa.
        </p>
        <div className="relative w-full h-[544px] rounded-xl  bg-no-repeat bg-cover">
          <Image
            className="absolute w-full h-full rounded-xl"
            src={'/images/bg/jumbotron-default.jpeg'}
            alt={'a'}
            height={150}
            width={150}
          />
          <div
            className="absolute w-full h-full rounded-xl"
            style={{
              background:
                'linear-gradient(rgb(33 0 5 / 60%) 0%, rgb(27 0 0 / 90%) 100%)',
            }}
          />
          <Image
            className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
            src="/logo.png"
            width="260"
            height="268"
            alt="Logo Bolsel"
          />
        </div>
      </div>
      <div className="mb-12 lg:mb-16">
        <h3 className="md:p-6 font-lora font-bold text-2xl md:text-[26px] text-center md:text-left text-blue-gray-700 mb-6 md:mb-0">
          Makna Logo
        </h3>

        <ul className="grid md:grid-cols-2">
          {maknaList.map((makna, i) => (
            <li
              key={i}
              className="min-h-[159px] p-6 flex flex-col-reverse md:flex-row gap-6
                                        md:odd:border-r md:border-b"
            >
              <div>
                <p
                  className=" text-blue-gray-600 leading-6"
                  dangerouslySetInnerHTML={{ __html: makna.text }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
