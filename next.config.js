/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    allowedDevOrigins: ['127.0.0.1', 'localhost'],
  },
/**   async rewrites() {
    return {
          // 静的ファイルやページルートをチェックする「前」に実行
      beforeFiles: [
        {
          source: '/api-kuma/:path*',
          destination: 'https://rielukuma.uniproject.jp/:path*',
        },
      ],
    }
  },*/
}

export default nextConfig;