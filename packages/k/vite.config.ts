import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {libInjectCss} from 'vite-plugin-lib-inject-css'
import preserveDirectives from 'rollup-preserve-directives'
import dts from 'vite-plugin-dts'
import {TanStackRouterVite} from '@tanstack/router-plugin/vite'

import {extname, relative, resolve} from 'path'
import {fileURLToPath, URL} from 'url'
import {glob} from 'glob'

// build lib mode
const isProduction = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    !isProduction && TanStackRouterVite(),
    react(),
    libInjectCss(),
    dts({tsconfigPath: resolve(__dirname, 'tsconfig.lib.json')}),
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
          .sync('lib/**/*.{ts,tsx}', {
            ignore: ['lib/**/*.d.ts', 'lib/**/*types.ts'],
          })
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
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
