// import {themes as prismThemes} from 'prism-react-renderer'
import type {Config} from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const config: Config = {
  title: 'Kaiverse',
  tagline: 'Collection of powerful utility functions, React components & hooks',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://github.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ['rss', 'atom'],
        //     xslt: true,
        //   },
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: 'warn',
        //   onInlineAuthors: 'warn',
        //   onUntruncatedBlogPosts: 'warn',
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    async function tailwindPlugins() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(tailwindcss)
          postcssOptions.plugins.push(autoprefixer)
          return postcssOptions
        },
      }
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Kaiverse',
      logo: {
        alt: 'Kaiverse',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Components',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/kaisergeX/kaiverse',
          label: 'GitHub',
          position: 'right',
        },
      ],
      hideOnScroll: true,
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Components',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Changelog',
              href: 'https://github.com/kaisergeX/kaiverse/releases',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/kaisergeX/kaiverse',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Kaiverse, Inc. Built with Docusaurus.`,
    },
    // prism: {
    //   theme: prismThemes.github,
    //   darkTheme: prismThemes.dracula,
    // },
  } satisfies Preset.ThemeConfig,
}

export default config
