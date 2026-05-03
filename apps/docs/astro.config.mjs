// @ts-check
import {defineConfig} from 'astro/config'
import starlight from '@astrojs/starlight'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
// import relativeLinks from 'astro-relative-links'
// import dynamicImport from 'vite-plugin-dynamic-import'

// https://astro.build/config
export default defineConfig({
  site: 'https://kaisergex.github.io',
  base: '/kaiverse',
  vite: {
    plugins: [
      // dynamicImport()
      tailwindcss(),
    ],
  },
  integrations: [
    // relativeLinks(),
    starlight({
      title: 'Kaiverse',
      social: [
        {
          label: 'GitHub',
          href: 'https://github.com/kaisergeX/kaiverse/tree/main/packages/k#readme',
          icon: 'github',
        },
      ],
      customCss: [
        './src/styles/global.css',
        './src/styles/landing.css',
        '@fontsource-variable/nunito',
      ],
      sidebar: [
        {
          label: 'Getting Started',
          slug: 'getting-started',
        },
        {
          label: 'Components',
          autogenerate: {directory: 'components'},
        },
        {
          label: 'Hooks',
          autogenerate: {directory: 'hooks'},
        },
        {
          label: 'Utilities',
          autogenerate: {directory: 'utils'},
        },
      ],
      expressiveCode: {
        styleOverrides: {borderRadius: '0.25rem'},
      },
    }),
    react(),
  ],
})
