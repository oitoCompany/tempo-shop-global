const path = require("path");
const { merge } = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpackCommon = require("./webpack.common");

module.exports = merge(webpackCommon, {
  mode: "production",
  output: {
    filename: "static/js/main.js", // Ensure single output file
    path: path.resolve(__dirname, "../docs"),
    publicPath: "/"
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            keep_fnames: true
          }
        }
      })
    ],
    runtimeChunk: false, // Disable runtime chunk
    splitChunks: false // Disable code splitting
  },
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin()
  ]
});
