import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInOut: {
          '0%': { opacity: '0', transform: 'translateY(-20px) translateX(-50%)' },
          '10%, 90%': { opacity: '1', transform: 'translateY(0) translateX(-50%)' },
          '100%': { opacity: '0', transform: 'translateY(-20px) translateX(-50%)' },
        },
      },
      animation: {
        'fade-in-out': 'fadeInOut 2s ease-in-out forwards',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config 