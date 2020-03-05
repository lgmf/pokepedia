const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  publicPath: "/",
  chainWebpack: (config) => {
    config.plugins.delete("preload");
  },
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ["src/**/*.{vue,scss}"]
      })
    ]
  },
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/serviceWorker.js"
    },
    msTileColor: "#21395a",
    manifestOptions: {
      name: "Pokepedia",
      start_url: "/effectiveness",
      theme_color: "#21395a",
      background_color: "#21395a"
    }
  }
};
