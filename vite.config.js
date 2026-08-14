import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' — важно для Telegram Mini App, чтобы пути к файлам были
// относительными (иначе после деплоя на некоторых хостингах белый экран).
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: true,
  },
})
