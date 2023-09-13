import { TWebsitePageProps } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Halaman tidak ditemukan',
};

export default function Page(props: TWebsitePageProps) {
  notFound();
}
