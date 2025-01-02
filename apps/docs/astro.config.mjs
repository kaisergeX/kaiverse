// @ts-check
import {defineConfig} from 'astro/config'
import starlight from '@astrojs/starlight'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
// import relativeLinks from 'astro-relative-links'
// import dynamicImport from 'vite-plugin-dynamic-import'

// https://astro.build/config
export default defineConfig({
  site: 'https://kaisergex.github.io',
  base: '/kaiverse',
  // vite: {
  //   plugins: [dynamicImport()],
  // },
  integrations: [
    // relativeLinks(),
    starlight({
      title: 'Kaiverse',
      social: {
        github: 'https://github.com/kaisergeX/kaiverse/tree/main/packages/k#readme',
      },
      customCss: [
        './src/assets/custom.css',
        './src/assets/landing.css',
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
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
