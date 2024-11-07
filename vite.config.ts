import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  server: {
    proxy: {
      '/generate_resume': {
        // target: 'http://127.0.0.1:8000',
        // target: 'http://localhost:8000',
        target: 'http://127.0.0.1:8000/generate_resume',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/generate_resume/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
