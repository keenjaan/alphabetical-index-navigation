var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

//定义地址
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
var APP_FILE = path.resolve(APP_PATH, 'app'); //根目录文件app.jsx地址
var BUILD_PATH = path.resolve(ROOT_PATH, '/build/static'); //发布文件所存放的目录

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './vue/main.js'
    ]
  },
  output: {
    publicPath: '/', //编译好的文件，在服务器的路径,这是静态资源引用路径
    path: '/build/static', //发布文件地址
    filename: '[name].js', //编译后的文件名字
    chunkFilename: '[name].[chunkhash:5].min.js',
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.js', '.css'], //后缀名自动补全
    alias: {
      'views': resolve('src/views'),
      'style': resolve('src/style'),
      'common': resolve('src/common'),
      'components': resolve('src/components'),
      'assets': resolve('src/assets'),
      'vue': 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                css: [
                  'vue-style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      minimize: false,
                      sourceMap: true
                    }
                  }
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader?modules',
            options: {
              minimize: false,
              sourceMap: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      //process.argv：当前进程的命令行参数数组。
      //process.env：指向当前shell的环境变量，比如process.env.HOME。
      'process.env': {
        NODE_ENV: JSON.stringify('development') //定义编译环境
      }
    }),
    new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
      filename: 'index.html', //生成的html存放路径，相对于 path
      template: 'index.html', //html模板路径
      inject: true,
      hash: false,
      title: 'vue app'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
