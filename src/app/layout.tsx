import '../styles/globals.css';
import type { Metadata } from 'next';
import { variableClass } from '@/styles/fonts';
import clsx from 'clsx';
import Script from 'next/script';
import { IS_DEV, urlToPortal } from '@/init';
import ModalProvider from '@/components/modal/provider';
import { currentReqSubdomain } from '@/lib/server';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const subdomain = currentReqSubdomain();

  return (
    <html lang="id" data-theme={subdomain}>
      <head>
        <link rel="icon" href={urlToPortal('/favicon.ico')} sizes="any" />
        <meta name="theme-color" content="#c6312a" />
      </head>
      <body className={clsx(variableClass)}>
        {!IS_DEV && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <ModalProvider>{children}</ModalProvider>
        {!IS_DEV && (
          <Script
            id="gtag-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}');
          `,
            }}
          />
        )}
      </body>
    </html>
  );
}
