// @ts-check
import {defineConfig} from 'astro/config'
import starlight from '@astrojs/starlight'

import react from '@astrojs/react'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Kaiverse',
      social: {
        github: 'https://github.com/kaisergeX/kaiverse',
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
