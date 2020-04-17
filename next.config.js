const path = require('path')
const withLess = require('@akouryy/next-less')
const withCSS = require('@zeit/next-css')

module.exports = withCSS(withLess({
  lessLoaderOptions: {
    math: 'strict',
    strictUnits: true
  },
  webpack: (config, _) => {
    /* eslint-disable no-param-reassign */
    config.resolve.symlinks = false
    config.resolve.alias.react = path.resolve('./node_modules/react')
    return config
  }
}))
