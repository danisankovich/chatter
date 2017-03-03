module.exports = {
  entry: './public/javascripts/index.js',
  output: {
    path: './public/javascripts/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      }
    ]
  }
}
