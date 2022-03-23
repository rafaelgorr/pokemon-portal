module.exports = () => ({
  plugins: [
    // [
    //   'postcss-url',
    //   {
    //     filter: '**/fonts/**',
    //     url: (asset) => asset.url
    //     // env === 'production' ? `..${asset.url}` : `..${asset.url}`
    //   }
    // ],
    require('autoprefixer'), // aplica prefixadores de acordo com a lista de browsers a serem suportados
  ],
})
