import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Local dev: run the PHP backend with `php -S localhost:8000 -t admin-api`
      // and this proxies /api/* to it, so the browser sees everything as same-origin
      // (matching production, where admin-api/ is deployed alongside this build).
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
