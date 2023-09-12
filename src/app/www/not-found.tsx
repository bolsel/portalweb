import PageWithJumbotron from '@/components/pages/with-jumbotron';
import { urlToPortal } from '@/init';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <PageWithJumbotron
      jumbotron={{
        title: '',
      }}
    >
      <Image
        src={urlToPortal('/images/404.svg')}
        width="295"
        height="178"
        alt="halaman tidak ditemukan"
      />
      <div className="flex flex-col gap-1 justify-center">
        <h1 className="text-center  text-primary-dark font-lora text-[21px] leading-[34px] font-bold">
          Halaman tidak ditemukan.
        </h1>
        <p className="text-center font-lato text-sm leading-6 ">
          Halaman yang anda minta tidak ditemukan, atau belum tersedia untuk
          sementara waktu.
        </p>
      </div>
      <Link href="/" tabIndex={-1}>
        <button className="btn btn-primary">Kembali Ke Beranda</button>
      </Link>
    </PageWithJumbotron>
  );
}
