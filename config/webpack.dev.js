const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

const webpackCommon = require("./webpack.common");

module.exports = merge(webpackCommon, {
  mode: "development",
  output: {
    filename: "[name].bundle.js", // Development build keeps bundle names
    path: path.resolve(__dirname, "../docs"),
    publicPath: "/"
  },
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    overlay: true,
    contentBase: path.join(__dirname, "docs"),
    host: "localhost",
    port: 8015,
    publicPath: "/"
  },
  devtool: "cheap-eval-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
