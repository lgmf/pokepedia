const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  publicPath: "/",
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ["src/**/*.{vue,scss}"]
      })
    ]
  }
};
