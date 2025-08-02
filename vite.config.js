import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/AiCollections/', // your repo name
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
