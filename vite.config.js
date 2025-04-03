import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      '8362-2001-ee0-52de-9ae0-2d5f-4977-d408-6a9e.ngrok-free.app'
    ]
  }
})
