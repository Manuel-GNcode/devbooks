import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        search: 'search.html',
        book: 'book.html',
        perfil: 'perfil.html'
      }
    }
  }
})