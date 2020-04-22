const path = require('path')
const withLess = require('@akouryy/next-less')
const withCSS = require('@zeit/next-css')

module.exports = withCSS(withLess({
  exportPathMap: () => ({
    '/': { page: '/' },
    '/r2': { page: '/r2' },
  }),
  lessLoaderOptions: {
    math: 'strict',
    strictUnits: true
  },
  webpack: (config, _) => {
    /* eslint-disable no-param-reassign */
    config.resolve.symlinks = false
    config.resolve.alias.react = path.resolve('./node_modules/react')
    config.resolve.alias['react-is'] = path.resolve('./node_modules/react-is')
    return config
  }
}))
