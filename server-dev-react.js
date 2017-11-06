var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.react.dev');

var app = express();
var compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: false,
	inline: true,
	progress: true,
	stats: {
	  colors: true,
	}
}));

app.use(require('webpack-hot-middleware')(compiler));

//将其他路由，全部返回index.html
// app.get('*', function(req, res) {
// 	res.sendFile(__dirname + '/index.html')
// });

app.listen(8082, function() {
	console.log('正常打开8082端口')
});
