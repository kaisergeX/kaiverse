import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {libInjectCss} from 'vite-plugin-lib-inject-css'
import preserveDirectives from 'rollup-preserve-directives'
import dts from 'vite-plugin-dts'

import {extname, relative, resolve} from 'path'
import {fileURLToPath, URL} from 'url'
import {glob} from 'glob'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({tsconfigPath: resolve(__dirname, 'tsconfig.lib.json')}),
    preserveDirectives(),
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
