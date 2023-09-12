import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { fontFamily } from 'tailwindcss/defaultTheme';

import { parseColor } from 'tailwindcss/lib/util/color';

const toRGB = (value) => parseColor(value).color.join(' ');

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '450px', // => @media (min-width: 450px) { ... }
      },
      colors: {
        primary: 'rgb(var(--c-primary) / <alpha-value>)',
        'primary-dark': 'rgb(var(--c-primary-dark) / <alpha-value>)',
        'primary-50': 'rgb(var(--c-primary-50) / <alpha-value>)',
        'primary-100': 'rgb(var(--c-primary-100) / <alpha-value>)',
        'primary-200': 'rgb(var(--c-primary-200) / <alpha-value>)',
        'primary-300': 'rgb(var(--c-primary-300) / <alpha-value>)',
        'primary-400': 'rgb(var(--c-primary-400) / <alpha-value>)',
        'primary-500': 'rgb(var(--c-primary-500) / <alpha-value>)',
        'primary-600': 'rgb(var(--c-primary-600) / <alpha-value>)',
        'primary-700': 'rgb(var(--c-primary-700) / <alpha-value>)',
        'primary-800': 'rgb(var(--c-primary-800) / <alpha-value>)',
        'primary-900': 'rgb(var(--c-primary-900) / <alpha-value>)',
        'blue-gray': {
          50: '#E3E7ED',
          100: '#B9C3D3',
          200: '#8D9DB5',
          300: '#627798',
          400: '#415C84',
          500: '#1A4373',
          600: '#133C6B',
          700: '#083461',
          800: '#022B55',
          900: '#001B3D',
        },
      },

      fontFamily: {
        default: ['var(--font-lato)', ...fontFamily.sans],
        intro: ['var(--font-intro)', ...fontFamily.sans],
        heading: ['var(--font-roboto)', ...fontFamily.sans],
        content: ['var(--font-lora)', ...fontFamily.sans],
        'content-title': ['var(--font-lora)', ...fontFamily.sans],
        menu: ['var(--font-roboto)', ...fontFamily.sans],
      },

      transitionTimingFunction: {
        brand: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        250: '250ms',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },

  daisyui: {
    logs: false,
    themes: [
      {
        light: {
          primary: '#c6312a',
          'primary-content': '#ffffff',
          secondary: '#0ea5e9',
          accent: '#37CDBE',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
        kominfo: {
          primary: '#1574ae',
          'primary-content': '#ffffff',
          secondary: '#263c80',
          accent: '#37CDBE',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--c-primary': toRGB('#c6312a'),
          '--c-primary-dark': toRGB('#b91c1c'),
          '--c-primary-50': toRGB('#fef2f2'),
          '--c-primary-100': toRGB('#fee2e2'),
          '--c-primary-200': toRGB('#fecaca'),
          '--c-primary-300': toRGB('#fca5a5'),
          '--c-primary-400': toRGB('#f87171'),
          '--c-primary-500': toRGB('#ef4444'),
          '--c-primary-600': toRGB('#dc2626'),
          '--c-primary-700': toRGB('#b91c1c'),
          '--c-primary-800': toRGB('#991b1b'),
          '--c-primary-900': toRGB('#7f1d1d'),
        },
        '[data-theme=kominfo]': {
          '--c-primary': toRGB('#1574ae'),
          '--c-primary-dark': toRGB('#0d5b8c'),
          '--c-primary-50': toRGB('#f0f9ff'),
          '--c-primary-100': toRGB('#e0f2fe'),
          '--c-primary-200': toRGB('#bae6fd'),
          '--c-primary-300': toRGB('#7dd3fc'),
          '--c-primary-400': toRGB('#38bdf8'),
          '--c-primary-500': toRGB('#0ea5e9'),
          '--c-primary-600': toRGB('#0284c7'),
          '--c-primary-700': toRGB('#0369a1'),
          '--c-primary-800': toRGB('#075985'),
          '--c-primary-900': toRGB('#0c4a6e'),
        },
      });
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),
  ],
};
export default config;
