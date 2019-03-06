const path = require('path')

module.exports = {
  entry: './src/client/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader']
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([?]?.*)$/,
        use: ['file-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: ['url-loader?limit=100000']
      }
    ]
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  }
}
