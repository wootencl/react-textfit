var path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'lib'),
    library: 'react-textfit',
    libraryTarget: 'umd',
    globalObject: 'this',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};