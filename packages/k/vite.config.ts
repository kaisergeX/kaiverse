import tailwindcss from '@tailwindcss/vite'
import {tanstackRouter} from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import {glob} from 'glob'
import {extname, relative, resolve} from 'path'
import preserveDirectives from 'rollup-preserve-directives'
import {fileURLToPath, URL} from 'url'
import {defineConfig} from 'vite'
import dts from 'unplugin-dts/vite'
import {libInjectCss} from 'vite-plugin-lib-inject-css'
import cssLayersPlugin from './plugins/css-layers-transform'

// build lib mode
const isProduction = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    !isProduction &&
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
    react(),
    !isProduction && tailwindcss(),
    libInjectCss(),
    dts({tsconfigPath: resolve(__dirname, 'tsconfig.lib.json'), exclude: ['lib/components/*/{hooks,icons,internals}']}),
    preserveDirectives(),
    {
      // libInjectCss (with preserveDirectives) adds the css import to the top of the file
      // this custom plugin moves 'use client' directive to the top of the file after the css import.
      enforce: 'post',
      name: 'hoist-directive',
      generateBundle(_, bundle) {
        for (const chunk of Object.values(bundle)) {
          if (chunk.type !== 'chunk' || !chunk.code.includes('use client')) {
            continue
          }

          chunk.code = chunk.code.replace(/['"]use client['"];/, '')
          chunk.code = `'use client';\n${chunk.code}`
        }
      },
    },
  ],
  css: {
    postcss: {
      plugins: [cssLayersPlugin()],
    },
  },
  server: {
    open: true,
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      // entry: {
      //   ui: resolve(__dirname, 'lib/components/index.ts'),
      //   hooks: resolve(__dirname, 'lib/hooks/index.ts'),
      //   utils: resolve(__dirname, 'lib/utils/index.ts'),
      // },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: Object.fromEntries(
        // https://rollupjs.org/configuration-options/#input
        glob
          .sync([
            'lib/index.ts',
            'lib/components/*/index.ts',
            'lib/components/index.ts',
            'lib/hooks/index.ts',
            'lib/utils/index.ts',
          ])
          .map((file) => [
            // 1. The name of the entry point
            // lib/nested/foo.js becomes nested/foo
            relative('lib', file.slice(0, file.length - extname(file).length)),
            // 2. The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
      },
    },
  },
})
