import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import https from 'https'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir: 'dist',
    rollupOptions:{
      input:{
        main: './src/main.jsx',
        app: './src/App.jsx',
        index: './index.html'
      }
    }
  }
})
