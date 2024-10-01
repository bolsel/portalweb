import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portalweb Bolsel',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-white font-intro text-center text-xl p-2">
        PORTALWEB BOLSEL
      </header>
      <main className="flex-1 bg-base-200">{children}</main>
      <footer className="bg-base-300 text-center py-2">
        &copy; Dinas Komunikasi dan Informatika Pemkab Bolsel
      </footer>
    </div>
  );
}
