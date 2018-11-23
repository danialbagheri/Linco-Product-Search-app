const path = require("path");

module.exports = {
  mode: "development",
  watch: true,
  entry: ["babel-polyfill", "./src/main.js"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist")
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js" // 'vue/dist/vue.common.js' for webpack 1
    }
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080
  }
};
