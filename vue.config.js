const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  publicPath: "/",
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ["src/**/*.{vue,scss}"]
      })
    ]
  },
  pwa: {
    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "src/serviceWorker.js"
      // ...other Workbox options...
    },
    themeColor: "#21395a"
  }
};
