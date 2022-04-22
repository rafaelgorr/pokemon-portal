const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTSCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
  port: 3001,
  analyze: false,
}

const babelLoader = {
  loader: require.resolve('babel-loader'),
  options: {
    cacheDirectory: true,
    babelrc: true,
    configFile: pathResolve('babel.config.json'),
  },
}

const tsRule = (env) => ({
  test: /\.ts(x?)$/,
  use: [
    babelLoader,
    {
      loader: require.resolve('ts-loader'),
      options: {
        transpileOnly: true,
        configFile: path.join(__dirname, 'tsconfig.json'),
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

const fileLoader = {
  include: /public/,
  exclude: /\.ejs$/,
  type: 'asset/resource',
  generator: {
    filename: (pathdata) =>
      pathdata.filename.endsWith('.ttf') || pathdata.filename.endsWith('.txt')
        ? 'fonts/[hash][ext]'
        : pathdata.filename.endsWith('.json')
        ? 'config.json'
        : 'images/[hash][ext]',
  },
}

/**
 * @param {Enviroment} env - Environment configuration
 * @returns {import('webpack').Configuration['module']} *
 */
const configModule = (env) => ({
  rules: [cssLoader(env), fileLoader, tsRule(env)],
})

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
  },
  extensions: ['.ts', '.tsx', '.js'],
  // fallback: {
  //   url: require.resolve('url/'),
  //   path: require.resolve('path-browserify/'),
  // },
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
  // new webpack.ProvidePlugin({
  //   process: 'process/browser',
  // }),
  new webpack.EnvironmentPlugin({
    PUBLIC_PATH: '/',
    NODE_ENV: env.production ? 'production' : 'development',
    PRODUCTION: env.production,
    APP_TITLE: 'Empty React App',
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'public', 'index.ejs'),
    favicon: path.join(PUBLIC, 'assets', 'favicon.png'),
    title: 'Empty React App',
    inject: false,
  }),
  new webpack.DefinePlugin({
    VERSION: JSON.stringify(require('./package.json').version),
  }),
  // new BundleAnalyzerPlugin(),
]

const makeDevPlugins = (env) => [...makeCommonPlugins(env)]

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
  filename: env.production ? 'js/[name].[contenthash].js' : 'js/[name].js',
  path: DIST,
  publicPath: '/',
})

// const devServer = (env) => ({
//   contentBase: PUBLIC,
//   disableHostCheck: true,
//   port: env.port,
//   stats: {
//     all: false,
//     modules: true,
//     maxModules: 0,
//     errors: true,
//     warnings: false,
//     version: true,
//     colors: true,
//   },
//   inline: true,
//   host: '0.0.0.0',
//   historyApiFallback: true,
// })

/**
 * @param {Enviroment} env - Environment configuration
 * @returns {import('webpack').Configuration['devServer']} *
 */
const devServer = (env) => ({
  static: {
    publicPath: '/',
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
    },
  },
  client: {
    progress: true,
    logging: 'info',
  },
  allowedHosts: 'all',
  port: env.port,
  // inline: true,
  host: '0.0.0.0',
  historyApiFallback: true,
})

/**
 * @param {Enviroment} env - Environment configuration
 * @returns {import('webpack').Configuration} *
 */
const webpackConfig = (env) => {
  env = { ...defaultEnv, ...env }
  return {
    context: SRC,
    mode: env.production ? 'production' : 'development',
    entry: './index.tsx',
    devtool: env.production ? undefined : 'eval-cheap-module-source-map',
    devServer: devServer(env),
    module: configModule(env),
    plugins: env.production ? makeProdPlugins(env) : makeDevPlugins(env),
    resolve,
    output: output(env),
    optimization: {
      minimize: env.production === 'production',
      minimizer: env.production ? [`...`, new CssMinimizerPlugin()] : [],
    },
    experiments: {
      topLevelAwait: true,
    },
  }
}
module.exports = webpackConfig
