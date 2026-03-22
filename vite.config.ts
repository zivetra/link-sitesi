import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import backendPlugin from './vite-plugin-backend.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), backendPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5000,
  },
})
