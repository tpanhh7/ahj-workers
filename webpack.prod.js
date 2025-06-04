const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { GenerateSW } = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      swDest: "sw.js",
      include: [/\.html$/, /\.js$/, /\.css$/],
      exclude: [/service-worker\.js$/],
    }),
  ],
});
