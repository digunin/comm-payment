const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: isDev ? "[name].[contenthash].js" : "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ca]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@public": path.resolve(__dirname, "public"),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      publicDir: path.join("", path.sep),
      template: "public/index.html",
      title: "Comm payment",
    }),
    new CleanWebpackPlugin(),
  ],
  devtool: "source-map",
  devServer: {
    port: 5500,
  },
};
