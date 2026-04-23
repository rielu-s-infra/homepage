import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // これを明示的に追加（assets へのパスを /assets/... に固定するため）
  server: {
    proxy: {
      '/api-kuma': {
        target: 'https://rielukuma.uniproject.jp',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-kuma/, ''),
      }
    }
  }
});