import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(({ mode }) => ({
  build: {
    minify: 'terser',
    outDir: 'dist',
    sourcemap: mode === 'dev',
    lib: {
      entry: {
        api: 'src/index.ts',
        exceptions: 'src/Exceptions.ts'
      },
      name: 'client',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      output: {
        exports: 'named',
      }
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }
    ]
  },
  plugins: [
    dts({
      tsconfigPath: './tsconfig.build.json',
      insertTypesEntry: true,
    })
  ]
}))
