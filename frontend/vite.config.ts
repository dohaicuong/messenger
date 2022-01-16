import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import relay from 'vite-plugin-relay'

export default defineConfig({
  server: {
    https: true,
    proxy: {
      '/graphql': {
        target: 'http://0.0.0.0:4000',
        ws: true,
      }
    }
  },
  define: {
    global: {
      global: 'globalThis'
    }
  },
  plugins: [react(), relay],
})
