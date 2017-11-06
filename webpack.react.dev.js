var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

//定义地址
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'react'); //__dirname 中的src目录，以此类推
var APP_FILE = path.resolve(APP_PATH, 'app'); //根目录文件app.jsx地址
var BUILD_PATH = path.resolve(ROOT_PATH, '/build/static'); //发布文件所存放的目录

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './react/app.jsx'
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
    extensions: ['.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
    alias: {
      'views': resolve('src/views'),
      'style': resolve('src/style'),
      'common': resolve('src/common'),
      'components': resolve('src/components'),
      'assets': resolve('src/assets'),
      'vue': 'vue/dist/vue.js',
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /^node_modules$/,
      loaders: ['react-hot-loader', 'babel-loader'],
      include: [APP_PATH]
    }, {
      test: /\.css$/,
      exclude: /^node_modules$/,
      loaders: ['style-loader', 'css-loader', 'postcss-loader'],
      include: [APP_PATH]
    }, {
      test: /\.jsx$/,
      exclude: /^node_modules$/,
      loaders: ['react-hot-loader', 'babel-loader'],
      include: [APP_PATH]
    }, {
      test: /\.(png|jpg)$/,
      exclude: /^node_modules$/,
      loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
      //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
      include: [APP_PATH]
    }]
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
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
