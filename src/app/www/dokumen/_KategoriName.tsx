'use client';
import SearchInput from '@/components/input/search-input';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function KategoriName({ categories }) {
  const searchParams = useSearchParams();
  const currentKategoriSlug = searchParams.get('kategori') ?? '';
  const search = searchParams.get('q') ?? '';
  const kategori =
    currentKategoriSlug === ''
      ? 'Dokumen Terbaru'
      : categories.find((d) => d.slug === currentKategoriSlug).name;
  const router = useRouter();
  return (
    <>
      <h1 className="font-bold font-lora text-primary-700 text-[28px] md:text-4xl text-center md:text-left leading-9 md:leading-[56px] mb-8">
        {kategori}
      </h1>

      <div className="mb-2">
        <SearchInput
          placeholder="Cari dokumen"
          currentValue={search}
          onClear={() =>
            router.push(
              `/dokumen${
                currentKategoriSlug ? `?kategori=${currentKategoriSlug}` : ''
              }`
            )
          }
          onSubmit={(value) =>
            currentKategoriSlug
              ? router.push(
                  `/dokumen?kategori=${currentKategoriSlug}&q=${value}`
                )
              : router.push(`/dokumen?q=${value}`)
          }
        />
      </div>
    </>
  );
}
