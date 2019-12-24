const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_PROD = NODE_ENV === 'production';
const PATH_INPUT_FILE = path.resolve(__dirname, 'src', 'client', 'index.tsx');
const PATH_OUT_DIR = path.resolve(__dirname, 'dist');
const OUT_FILE = 'bundle.js';

const plugins = [new MiniCssExtractPlugin(), new HtmlWebpackPlugin()];

module.exports = {
  entry: PATH_INPUT_FILE,
  output: {
    filename: OUT_FILE,
    path: PATH_OUT_DIR
  },
  mode: IS_PROD ? 'production' : 'development',
  devtool: IS_PROD ? 'source-map' : 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { onlyCompileBundledFiles: true }
      },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { esModule: true } },
          { loader: 'css-loader', options: { esModule: true } }
        ]
      }
    ]
  },
  plugins: IS_PROD ? plugins.concat(new OptimizeCssAssetsPlugin()) : plugins
};
