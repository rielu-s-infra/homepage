import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 0.0.0.0 で待機
    port: 5173,
    watch: {
      usePolling: true, // ファイル変更検知をポーリングにする（Dockerで必須な場合が多い）
    },
    // Codespacesやプロキシ環境でHMRを安定させる設定
    hmr: {
      clientPort: 5173,
    },
  },
})