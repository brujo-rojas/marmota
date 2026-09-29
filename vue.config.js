const path = require('path')
const fs = require('fs')

// Si existe App.vue, usar main-dev.js para desarrollo
const appExists = fs.existsSync(path.resolve(__dirname, 'src/App.vue'))
const entry = appExists ? './src/main-dev.js' : './src/main.js'

module.exports = {
  css: {
    extract: true
  },
  configureWebpack: {
    entry: process.env.VUE_CLI_BUILD_TARGET === "lib" ? './src/main.js' : entry
  },
  chainWebpack: config => {
    if (process.env.VUE_CLI_BUILD_TARGET === "lib") {
      config.externals({
        lodash: "lodash",
        dayjs: "dayjs",
        "@mdi/js": "@mdi/js",
      });
    }
  }
}
