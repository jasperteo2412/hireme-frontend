const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.tsx',
  devtool: false,
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devServer: {
    historyApiFallback: true,
  },
  optimization: {
    nodeEnv: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules\/(?!()\/).*/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
      {
        test: /\.(config)$/,
        use: {
          loader: "file-loader?name=[name].[ext]",
        },
      },
      {
        test: /(@?react-native-table-component).*\.(ts|js)x?$/,
        include: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /(@?react-native-collapsible).*\.(ts|js)x?$/,
        include: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /(@?react-native-swipe-list-view).*\.(ts|js)x?$/,
        include: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJ
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // If you are using less-loader@5 please spread the lessOptions to options directly
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.web.tsx', '.tsx', '.web.ts', '.ts', '.web.js', '.js', '.jsx', '.json'],
    alias: {
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
      'lottie-react-native': 'react-native-web-lottie',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./public/index.html'),
    }),
    new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
  ],
};