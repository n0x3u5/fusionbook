const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  plugins: [
    // generate HTML for the project
    new HtmlWebpackPlugin({
      title: 'FusionBook',
      template: './src/client/index.html'
    }),
    // extract CSS chunks
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    // minify CSS
    new OptimizeCssAssetsPlugin()
  ],
  module: {
    rules: [
      // transpile JS using babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      // deal with CSS imports and load extracted CSS chunks
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader'
        ]
      },
      // deal with images
      {
        test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      // deal with fonts
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  // configures the development server
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    overlay: true
  }
}
