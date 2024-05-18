import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import https from 'https'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:7031,
    proxy: {
      '/api': {
        target: 'https://localhost:7030', // Your ASP.NET MVC app URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  build:{
    outDir: 'dist',
    rollupOptions:{
      input:{
        main: './src/main.jsx',
        AppCSS: './css/App.css',
        app: './src/App.jsx'
      }
    }
  }
})
