var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		app: path.join(__dirname, './src/index.js'),
		style: path.join(__dirname, './src/index.css')
	},
	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, 'build')
	},
	resolve: {
		extensions: ['.js', '.jsx', '.css', '.json', '.html']
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: "html-loader"
			},
			{
				test: /\.js$/,
				loaders: ['react-hot-loader', 'babel-loader']
			},

			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'public/index.html'),
			filename: 'index.html'
		}),
		new ExtractTextPlugin("styles.css"),
		new CopyWebpackPlugin([
			{ from: 'src/image', to: 'images' }
		]),
	],
	watch: true,
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		compress: true,
		port: 3006,
		inline: true,
		historyApiFallback: true,
	}
}
