const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTSCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ReactRefreshTypeScript = require('react-refresh-typescript')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// const TERSER_WORKERS = process.env.TERSER_WORKERS
//   ? Number(process.env.TERSER_WORKERS)
//   : true // used on circleci config file

const pathResolve = (pth) => path.resolve(__dirname, pth)

const SRC = path.join(__dirname, 'src')
const PUBLIC = path.join(__dirname, 'public')
const DIST = path.join(__dirname, 'dist')

/**
 * @typedef {Object} Enviroment
 * @property {boolean} production
 * @property {number} port
 * @property {boolean} analyze
 */

const defaultEnv = {
  production: false,
  port: 3002,
  analyze: false,
}

/**
 * @param {Enviroment} env - Environment configuration
 * @param {import('webpack').RuleSetRule['options']} options - Environment configuration
 * @returns {import('webpack').RuleSetUseItem} *
 */
const getBabelLoader = (env, options) => ({
  loader: require.resolve('babel-loader'),
  options: {
    cacheDirectory: true,
    configFile: pathResolve('.babelrc.json'),
    ...options,
  },
})

/**
 * @param {Enviroment} env - Environment configuration
 * @returns {import('webpack').RuleSetRule} *
 */
const nodeModulesLoader = (env) => ({
  test: /\.(js|mjs)$/,
  include: /node_modules/,
  exclude: {
    or: [/@babel/, /core-js/],
  },
  // loader: require.resolve('babel-loader'),
  // options: {
  //   babelrc: false,
  //   sourceType: 'unambiguous',
  //   configFile: false,
  //   compact: false,
  //   sourceMaps: true,
  //   inputSourceMap: true,
  //   configFile: pathResolve('babel.config.json'),
  // },
  use: [
    getBabelLoader(env, {
      sourceType: 'unambiguous',
    }),
  ],
})

/**
 * @param {Enviroment} env - Environment configuration
 * @returns {import('webpack').RuleSetRule} *
 */
const tsRule = (env) => ({
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  exclude: /node_modules/,
  use: [
    getBabelLoader(),
    {
      loader: require.resolve('ts-loader'),
      options: {
        transpileOnly: true,
        configFile: path.join(__dirname, 'tsconfig.json'),
        getCustomTransformers: () => ({
          before: env.production ? [] : [ReactRefreshTypeScript()],
        }),
      },
    },
  ],
})

const cssLoader = (env) => ({
  test: /\.(s?)css$/,
  use: [
    env.production
      ? MiniCssExtractPlugin.loader // inject link tags for css file in html
      : 'style-loader', //  inject parsed css directly to html file
    {
      loader: 'css-loader',
      options: {
        modules: { localIdentName: '[name]_[local]_[hash:base64:5]' },
        sourceMap: !env.production,
        url: false,
      },
    },
    'postcss-loader', // create a AST of the .css files for parsed plugins
  ],
})

const svgLoader = {
  test: /\.svg$/,
  use: [{ loader: '@svgr/webpack', options: { dimensions: false } }, 'file-loader'],
}
const fileLoader = {
  include: /public/,
  exclude: /\.ejs$/,
  type: 'asset/resource',
  generator: {
    filename: (pathdata) =>
      (pathdata.filename.endsWith('.ttf') ?? pathdata.filename.endsWith('.txt'))
        ? 'fonts/[hash][ext]'
        : pathdata.filename.endsWith('.json')
          ? 'json/[hash][ext]'
          : 'images/[hash][ext]',
  },
}

/**
 * @param {Enviroment} env - Environment configuration
 * @returns {import('webpack').Configuration['resolve']} *
 */
const resolve = {
  alias: {
    '@pokemon-portal/src': pathResolve('src'),
    '@pokemon-portal/config': pathResolve('src/config'),
    '@pokemon-portal/assets': pathResolve('public/assets'),
    '@pokemon-portal/fonts': pathResolve('public/fonts'),
    '@pokemon-portal/api': pathResolve('src/api'),
    '@pokemon-portal/components': pathResolve('src/components'),
    '@pokemon-portal/constants': pathResolve('src/constants'),
    '@pokemon-portal/store': pathResolve('src/store'),
    '@pokemon-portal/style': pathResolve('src/style'),
    '@pokemon-portal/theme': pathResolve('src/views/theme'),
    '@pokemon-portal/utils': pathResolve('src/utils'),
    '@pokemon-portal/views': pathResolve('src/views'),
    // '@mui/base': '@mui/base/legacy',
    // '@mui/lab': '@mui/lab/legacy',
    // '@mui/material': '@mui/material/legacy',
    // '@mui/styled-engine': '@mui/styled-engine/legacy',
    // '@mui/system': '@mui/system/legacy',
    // '@mui/utils': '@mui/utils/legacy',
    // '@mui/private-theming': '@mui/private-theming/legacy',
    // '@mui/x-date-pickers': '@mui/x-date-pickers/legacy',
  },
  // include: [path.resolve(__dirname, '../../ui-libs/harmonize-form')],

  extensions: ['.ts', '.tsx', '.js'],
  fallback: {
    // url: require.resolve('url/'),
    // process: 'process/browser',
    // path: require.resolve('path-browserify/'),
    // events: require.resolve('events/'),
    // util: require.resolve('util/'),
    // util: false,
    fs: false,
    tls: false,
    crypto: false,
  },
}

const makeCommonPlugins = (env) => [
  new MiniCssExtractPlugin({
    chunkFilename: env.production ? 'styles/[id].[contenthash].css' : 'styles/[id].css',
    filename: env.production ? 'styles/[name].[contenthash].css' : 'styles/[name].css',
  }),
  new CleanWebpackPlugin(),
  new ForkTSCheckerPlugin({
    typescript: {
      configFile: path.join(__dirname, 'tsconfig.json'),
      // diagnosticOptions: {
      //   semantic: true,
      //   syntactic: true,
      // },
    },
    devServer: true,
    async: true,
  }),
  new ESLintPlugin({
    extensions: ['ts', 'tsx'],
    configType: 'flat',
  }),
  // new webpack.ProvidePlugin({
  //   process: 'process/browser',
  // }),
  new webpack.EnvironmentPlugin({
    PUBLIC_PATH: '/',
    NODE_ENV: env.production ? 'production' : 'development',
    PRODUCTION: env.production,
    APP_TITLE: 'Pokemon Portal',
  }),
  new HtmlWebpackPlugin({
    template: path.join(PUBLIC, 'index.ejs'),
    favicon: path.join(PUBLIC, 'assets', 'favicon.png'),
    title: 'Pokemon Portal',
    inject: false,
  }),
  new webpack.DefinePlugin({
    VERSION: JSON.stringify(require('./package.json').version),
  }),
]

const makeDevPlugins = (env) => [
  ...makeCommonPlugins(env),
  new ReactRefreshPlugin({ overlay: false }),
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1, // To make HRM works we need all in one chunk
  }),
  // new BundleAnalyzerPlugin(),
]

const makeProdPlugins = (env) => [
  ...makeCommonPlugins(env),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: PUBLIC,
        to: DIST,
        globOptions: { ignore: ['**/*.ejs', '**/*.png'] },
      },
    ],
  }),
  // new CompressionPlugin({
  //   algorithm: 'gzip',
  //   filename: '[path].gz[query]',
  //   minRatio: 0.8,
  //   test: /\.(js|css|png|html)$/,
  //   threshold: 10240,
  // }),
]

/**
 * @param {Enviroment} env - Environment configuration
 * @returns {import('webpack').Configuration['output']} *
 */
const output = (env) => ({
  chunkFilename: env.production ? 'js/chunks/[name].[chunkhash].js' : 'js/chunks/[name].js',
  filename: env.production ? 'js/[name].[contenthash:6].js' : 'js/[name].js',
  path: DIST,
  publicPath: '/',
  clean: true,
  // environment: {
  //   arrowFunction: false,
  //   bigIntLiteral: false,
  //   const: false,
  //   destructuring: false,
  //   dynamicImport: false,
  //   forOf: false,
  //   module: false,
  //   optionalChaining: false,
  //   templateLiteral: false,
  // },
})

/**
 * @param {Enviroment} env - Environment configuration
 * @returns {import('webpack').Configuration['optimization']} *
 */
const optimization = (env) => ({
  minimize: env.production,
  minimizer: env.production ? [`...`, /*new TerserPlugin({ parallel: TERSER_WORKERS })*/ new CssMinimizerPlugin()] : [],
  usedExports: true,
  runtimeChunk: 'single',
  splitChunks: {
    chunks: 'async',
    // chunks: 'initial',
    // minSize: 40000,
    // cacheGroups: {
    //   vendor: {
    //     test: /[\\/]node_modules[\\/]/,
    //     chunks: 'all',
    //     name: (module, chunks) => {
    //       const allChunksNames = chunks.map(({ name }) => name).join('.')
    //       const moduleName = (module.context.match(
    //         /[\\/]node_modules[\\/](.*?)([\\/]|$)/
    //       ) ?? [])[1]

    //       return `${moduleName}.${allChunksNames}`
    //     },
    //   },
    // },
  },
})

/**
 * @param {Enviroment} env - Environment configuration
 * @returns {import('webpack').Configuration['devServer']} *
 */
const devServer = (env, settings) => ({
  static: {
    publicPath: pathResolve(''),
    watch: true,
  },
  devMiddleware: {
    stats: {
      all: false,
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: false,
      version: true,
      colors: true,
      timings: true,
    },
  },
  // client: {
  //   progress: true,
  //   logging: 'info',
  //   overlay: true,
  // },
  allowedHosts: 'all',
  port: env.port,
  host: '0.0.0.0',
  historyApiFallback: true,
  webSocketServer: 'sockjs',
  hot: true,
  liveReload: false,
  // proxy: {
  //   '/api': {
  //     target: 'http://<ip>:8080',
  //     secure: false,
  //   },
  // },
  headers: {
    'Cache-Control': 'no-cache',
    'Add-Header': 'no-cache',
    Expires: '-1',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': '*',
    // 'Access-Control-Allow-Methods': '*',
  },
})

/**
 * @param {Enviroment} env - Environment configuration
 * @returns {import('webpack').Configuration['module']} *
 */
const configModule = (env) => ({
  rules: [cssLoader(env), fileLoader, svgLoader, nodeModulesLoader(env), tsRule(env)],
})

/**
 * @param {Enviroment} env - Environment configuration
 * @returns {import('webpack').Configuration} *
 */
const webpackConfig = (env, settings) => {
  env = { ...defaultEnv, ...env }

  return {
    context: SRC,
    mode: env.production ? 'production' : 'development',
    entry: [
      'whatwg-fetch', // necessary to make hot reload work on old browsers
      './index.tsx',
    ],
    devtool: 'source-map',
    devServer: devServer(env),
    module: configModule(env),
    plugins: env.production ? makeProdPlugins(env) : makeDevPlugins(env),
    resolve,
    output: output(env),
    target: ['web', 'es5'],
    optimization: optimization(env),
    experiments: {
      topLevelAwait: true,
    },
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  }
}
module.exports = webpackConfig
