// next.config.js
module.exports = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api-kuma/:path*',
        destination: 'https://rielukuma.uniproject.jp/:path*',
      },
    ]
  },
}