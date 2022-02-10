module.exports = {
 css: {
    extract: true
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
