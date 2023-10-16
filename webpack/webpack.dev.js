const path = require("path");
const { merge } = require("webpack-merge");
const Dotenv = require("dotenv-webpack");
const commonConfig = require('./webpack.common.js');

const devConfig = {
  // devtool: "eval-source-map",
  mode: "production",
  output: {
    //publicPath: 'http://localhost:3001/',
    path: path.join(__dirname, "../build/"),
    filename: "static/main.js",
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "/index.html",
    },
  },

  plugins: [
    new Dotenv({
      path: `./environment/.env`,
    }),
  ],
};
module.exports = merge(commonConfig, devConfig);