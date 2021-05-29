const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    filename: "./JS/[name].js",
    path: path.resolve(__dirname, "build")
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 8080,
    hot: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "eslint-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            "postcss-loader",
            "stylus-loader"
            
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff(2)?|eot|ttf|otf|svg|mp4|m4v)$/,
        use: [
          ImageMinimizerPlugin.loader,
          {
            loader: "url-loader",
            options: {
              limit: 10000
            },
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
      }
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
  },
  plugins: [ 
    new HtmlWebpackPlugin({ 
      title: 'Login Boilerplate',
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html', 
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new ProgressBarPlugin(),
    new MiniCssExtractPlugin({
      filename: "./CSS/[name].min.css"
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "public" }],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          ],
        ],
      },
    })
    ]
}