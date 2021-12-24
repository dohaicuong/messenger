import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import relay from 'vite-plugin-relay'

export default defineConfig({
  define: {
    global: {
      global: 'globalThis'
    }
  },
  plugins: [react(), relay],
})
