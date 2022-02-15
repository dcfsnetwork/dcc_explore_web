const webpack = require('webpack')
const { whenDev, whenProd } = require('@craco/craco')
const CracoVtkPlugin = require('craco-vtk')
const CracoAntDesignPlugin = require('craco-antd')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const FastRefreshCracoPlugin = require('craco-fast-refresh')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const WebpackBar = require('webpackbar')
const DashboardPlugin = require('webpack-dashboard/plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const path = require('path')
const resolvePath = dir => path.join(__dirname, dir)

module.exports = {
  devServer: {
    port: 8080,
    proxy: [
      {
        context: ['/data/api', '/api'],
        target: 'https://www.dcfsscan.io',
        changeOrigin: true
      }
    ]
  },
  webpack: {
    devtool: false,
    alias: {
      '@': resolvePath('src'),
      '@img': resolvePath('src/assets/imgs'),
      '@c': resolvePath('src/components'),
      '@v': resolvePath('src/views'),
      '@config': resolvePath('src/config'),
      '@context': resolvePath('src/context'),
      '@hooks': resolvePath('src/hooks'),
      '@mixin': resolvePath('src/mixin.scss')
    },
    plugins: [
      new WebpackBar({ color: '#ffc107' }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new AntdDayjsWebpackPlugin(),
      ...whenDev(
        () => [
          new CircularDependencyPlugin({
            exclude: /node_modules/,
            include: /src/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd()
          }),
          new DashboardPlugin()
        ],
        []
      ),
      ...whenProd(
        () => [
          new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
          new TerserPlugin({
            sourceMap: false,
            terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {},
              compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log']
              }
            }
          }),
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
            threshold: 1024,
            minRatio: 0.8
          })
        ],
        []
      )
    ],
    configure: webpackConfig => {
      webpackConfig.devtool = false
      webpackConfig.optimization = {
        splitChunks: {
          chunks: 'all',
          minSize: 40000,
          maxAsyncRequests: 5,
          maxInitialRequests: 4,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            common: {
              name: 'vendor',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|react-router|redux-saga|dva|react-router-dom|draft-js\/lib|core-js|@antv\/data-set\/build|)[\\/]/
            },
            antd: {
              name: 'antd',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](@ant-design|antd|moment|immutable\/dist|rc-calendar\/es|braft-finder\/dist|lodash|rc-tree\/es)[\\/]/,
              priority: 10
            }
          }
        }
      }
      return webpackConfig
    }
  },
  // babel: {
  //   plugins: [
  //     ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }, 'antd'],
  //     ['@babel/plugin-proposal-decorators', { legacy: true }]
  //   ]
  // },
  plugins: [
    { plugin: CracoVtkPlugin() },
    { plugin: FastRefreshCracoPlugin },
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#00c299',
          '@border-radius-base': '10px'
        }
      }
    }
  ]
}
