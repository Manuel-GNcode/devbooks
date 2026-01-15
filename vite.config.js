import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        book: resolve(__dirname, 'src/pages/book/book.html'),
        login: resolve(__dirname, 'src/pages/login/login.html'),
        perfil: resolve(__dirname, 'src/pages/perfil/perfil.html'),
        search: resolve(__dirname, 'src/pages/search/search.html'),
      }
    }
  }
})