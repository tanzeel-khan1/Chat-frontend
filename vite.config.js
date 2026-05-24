import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    port: 4001,
    proxy: {
      '/api': {
        target: 'https://my-app1111.bonto.run',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
