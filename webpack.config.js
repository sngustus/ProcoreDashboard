const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const libraryName = 'procoreIframeHelpers';

module.exports = {
  entry: {
    'ProcoreIframeHelpers': './src/index.ts',
    'ProcoreIframeHelpers.min': './src/index.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: "source-map",
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          reduce_funcs: false,
          inline: false
        },
      },
      include: /\.min\.js$/
    })]
  }
};
