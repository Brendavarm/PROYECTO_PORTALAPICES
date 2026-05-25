import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  assetsInclude: ['**/*.svg'],
  server: {
    port: 5173,
    host: '0.0.0.0',
    strictPort: true,
    // Túneles Cloudflare / ngrok (el subdominio cambia en cada sesión)
    allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.ngrok.io', 'localhost'],
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
});
