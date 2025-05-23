const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '..', 'public'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Path to your template
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Automatically resolve these extensions
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '..', 'public'), // Serve files from the public directory
    },
    compress: true,
    port: 3000, // Port for the dev server
  },
};
