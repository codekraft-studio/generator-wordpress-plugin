const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const sourcePath = path.resolve(__dirname, 'assets/src');

module.exports = {
  mode: 'production',
  entry: {
    user: path.resolve(sourcePath, "js/user/user.js"),
    admin: path.resolve(sourcePath, "js/admin/admin.js"),
  },
  output: {
    path: path.resolve(__dirname, "assets/dist"),
    filename: "[name].js"
  },
  resolve: {
    alias: {
      src: sourcePath
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  watchOptions: {
    ignored: [
      'assets/dist',
      'node_modules'
    ]
  }
};
