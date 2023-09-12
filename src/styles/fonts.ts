import localFont from 'next/font/local';
import { Lora, Lato, Roboto } from 'next/font/google';
import clsx from 'clsx';

export const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
});

export const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const intro = localFont({
  src: './fonts/Intro.otf',
  variable: '--font-intro',
  weight: '600',
});

export const variableClass = clsx(
  intro.variable,
  lora.variable,
  lato.variable,
  roboto.variable
);
