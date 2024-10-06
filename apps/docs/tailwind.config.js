import daisyui from 'daisyui'
import daisyThemes from 'daisyui/src/theming/themes'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{ts,tsx}', './docs/**/*.{md,mdx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['retro', {dark: daisyThemes.night}],
  },
  blocklist: ['container', 'footer'],
  plugins: [daisyui],
}
