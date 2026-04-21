/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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

module.exports = nextConfig