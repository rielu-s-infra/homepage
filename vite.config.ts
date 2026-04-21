import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-kuma': {
        target: 'https://rielukuma.uniproject.jp',
        changeOrigin: true,
        // /api-kuma/api/status-page/... としてリクエストを送る設定
        rewrite: (path) => path.replace(/^\/api-kuma/, ''),
      }
    }
  }
});