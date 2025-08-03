import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
	base: './', // Добавьте эту строку
	plugins: [
    vue({
      template: {
        transformAssetUrls: {} // Важно для Vite+Vue
      }
    })
  ],
	resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})