import daisyui from 'daisyui'

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
    themes: ['retro', 'dark'],
  },
  blocklist: ['container', 'footer'],
  plugins: [daisyui],
}
