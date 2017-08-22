var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  context: path.resolve(__dirname, 'app'),
   
  entry: {
    'app': './src/main.ts'
  },
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      ON_TEST: process.env.NODE_ENV === 'test'
    })
  ],

  stats: {
    hash: false
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    rules: [
    {
      test: /\.json$/,
      loader: 'raw-loader'
    },
    {
       test: /\.tsx?$/,
       use: 'ts-loader',
       exclude: /node_modules/
    },
    {
      test: /\.js$/,
      loader: 'ng-annotate-loader!babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'raw-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader',
      exclude: /node_modules/
    }, {
      test: /\.png$/,
      loader: 'url-loader'
    }]
  }
};

if (process.env.NODE_ENV === 'production') {

  config.output.path = __dirname + '/dist';
  config.output.filename = 'bundle-[chunkhash].js';

  config.plugins.push(new HtmlWebpackPlugin({
    template: __dirname + '/dist/index.html',
    inject: 'body',
    filename: __dirname + '/dist/index.html'
  }));

  config.devtool = 'source-map';
} else {
  config.devtool = 'cheap-source-map';

  /*
  config.plugins.push(new HtmlWebpackPlugin({
    template: __dirname + '/atlasapp/index.html',
    inject: 'body',
    filename: __dirname + '/atlasapp/index.html'
  }));
  */
}

module.exports = config;
