import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import inject from '@rollup/plugin-inject'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  resolve: {
    alias: [
      { find: '@components', replacement: resolve(__dirname, './src/components') },
      { find: '@hooks', replacement: resolve(__dirname, './src/hooks') },
      { find: '@pages', replacement: resolve(__dirname, './src/pages') },
      { find: '@store', replacement: resolve(__dirname, './src/store') },
      { find: '@', replacement: resolve(__dirname, './src') }
    ],
  },
  build: {
    rollupOptions: {
      plugins: [
        inject({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        })
      ]
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
})