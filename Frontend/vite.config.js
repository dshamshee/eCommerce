import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';
dotenv.config();

// eslint-disable-next-line no-undef
const proxyURI = process.env.VITE_SERVER_PROXY_URI;
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server:{
    proxy:{
      '/api': proxyURI,
    }
  }
})
