const path = require("path");
const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const commonConfig = require('./webpack.common.js');

const devConfig = {
  mode: 'production',
  output: {
    //publicPath: 'http://localhost:3001/',
    path: path.join(__dirname, "../build/"),
    filename: "static/main.js",
  },
  plugins: [
    new Dotenv({
      path: `./environment/.env.prod`,
    }),
  ],
};
module.exports = merge(commonConfig, devConfig);