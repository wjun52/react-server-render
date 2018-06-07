const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rootPath=path.join(__dirname,'../');
const theme = require('../package.json').theme;
const config = require('./config');

const devConfig={
  context: path.join(rootPath,'./src'),
  entry:{
    client:'./index.js',
    vendors:['react','react-dom','react-loadable','react-redux','redux','react-router-dom','react-router-redux','redux-thunk', 'react-helmet'],
  },
  output:{
    filename:'js/[name].[hash:8].js',
    path:path.resolve(rootPath,'./dist/client'),
    publicPath:'/',
    chunkFilename: 'js/[name]-[hash:8].js'
  },
  resolve:{
    extensions:[".js",".jsx","css","less","scss","png","jpg"],
    modules:[path.resolve(rootPath, "src"), "node_modules"],
  },
  devServer:{
    contentBase:'assets',
    hot:true,
    historyApiFallback:true,
  },
  devtool:'source-map',
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude: /node_modules/,
        include:path.resolve(rootPath, "src"),
        use:{
          loader:'babel-loader',
          options:{
            presets: ['env', 'react', 'stage-0'],
            plugins: [
              'external-helpers', 
              'transform-runtime', 
              'add-module-exports',
              ["import", [{ "style": true, "libraryName": "antd-mobile" }]]
            ],
            cacheDirectory: true,
          }
        }
      },{
        test: /\.less$/i, 
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',//css-loader 是处理css文件中的url(),require()等
              options: {
                sourceMap: true,
                // importLoaders: 1,
                // modules: true,
                // localIdntName: config.cssModulesClass,
              }
            },
            {
              loader: 'postcss-loader', 
              options: {
                plugins: () => [require("autoprefixer")({ browsers: 'last 5 versions' })],
                sourceMap: true,
              } 
            }, 
            {
              loader: 'less-loader', 
              options: {
                sourceMap: true,
                modifyVars: theme
              }
            }
            
          ]
        })
      }, {
        test: /\.css$/i, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',//css-loader 是处理css文件中的url(),require()等
              options: {
                sourceMap: true,
                // importLoaders: 1,
                // modules: true,
                // localIdentName: config.cssModulesClass,
              }
            }, 
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require("autoprefixer")({ browsers: 'last 5 versions' })],
                sourceMap: true,
              } 
            }
          ]
        })
      },{
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        exclude:/node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'img/[sha512:hash:base64:7].[ext]'
          }
        }
      }
    ]
  },
  plugins:[
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([{from:'favicon.ico'}]),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin({summary: false}),
    new ExtractTextPlugin({filename: 'style.[hash].css',}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV||'development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:['vendors','manifest'],
      minChunks:2
    }),
    new HtmlWebpackPlugin({
      filename:'index.html',
      template:'./index.ejs',
    }),
  ],
}

module.exports=devConfig