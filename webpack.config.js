const webpack = require("webpack");
const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
  target: "node",
  entry: {
    main: path.join(__dirname, "src/main.ts")
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    new Dotenv()
  ]
};
