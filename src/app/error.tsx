'use client'; // Error components must be Client Components

import { urlToPortal } from '@/init';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Error({ error }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col justify-center items-center space-x-4">
      <Image
        src={urlToPortal('/images/500.svg')}
        width="295"
        height="178"
        alt="halaman tidak ditemukan"
      />
      <div className="flex flex-col gap-1 justify-center">
        <h1 className="text-center  text-primary-dark font-lora text-[21px] leading-[34px] font-bold">
          Terjadi kesalahan.
        </h1>
        <p className="text-center font-lato text-sm leading-6 ">
          Terjadi kesalahan pada server, mohon mencoba kembali beberapa saat.
        </p>
      </div>
    </div>
  );
}
