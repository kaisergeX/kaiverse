import starlightPlugin from './plugins/starlight-tailwind'
import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [daisyui, starlightPlugin()],
  daisyui: {
    themes: ['cupcake', 'dark'],
  },
  blocklist: ['hero'],
}
