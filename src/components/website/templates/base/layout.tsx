import { ReactNode } from 'react';
import Header from './header';
import Jumbotron from './jumbotron';
import Footer from './footer';
import { SiteContextType } from '../../provider';

export default async function Layout({
  children,
  site,
}: { children: ReactNode } & SiteContextType) {
  return (
    <div data-theme={site.subdomain}>
      <Header />
      <main>
        <Jumbotron />
        <section className="w-full bg-gray-200">
          <div className="relative -top-24 z-10 ">
            <div className="ui-container">
              <div className="bg-white min-h-screen rounded-xl">{children}</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
