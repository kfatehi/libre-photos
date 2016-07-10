const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: `${__dirname}/src/index.jsx`,
    vendor: [
      'redux',
      'react',
      'react-dom',
      'react-redux',
    ]
  },
  output: {
    path: `${__dirname}/dist`,
    library: 'bundle',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
  ]
};
