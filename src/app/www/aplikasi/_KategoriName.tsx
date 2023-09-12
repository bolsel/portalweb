'use client';
import { useSearchParams } from 'next/navigation';

export default function KategoriName({ categories }) {
  const searchParams = useSearchParams();
  const currentKategoriSlug = searchParams.get('kategori') ?? '';
  const kategori =
    currentKategoriSlug === ''
      ? 'Semua Aplikasi'
      : categories.find((d) => d.slug === currentKategoriSlug).name;

  return (
    <h1 className="font-bold font-content-title text-primary-700 text-[28px] md:text-4xl text-center md:text-left leading-9 md:leading-[56px] mb-8">
      {kategori}
    </h1>
  );
}
