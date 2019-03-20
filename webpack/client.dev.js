const path = require("path");
const webpack = require("webpack");
const WriteFilePlugin = require("write-file-webpack-plugin"); // here so you can see what chunks are built
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

module.exports = {
	name: "client",
	target: "web",
	devtool: "inline-source-map",
	mode: "development",
	entry: [
		"webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false",
		"react-hot-loader/patch",
		path.resolve(__dirname, "../src/client.js")
	],
	output: {
		filename: "[name].js",
		chunkFilename: "[name].chunk.js",
		path: path.resolve(__dirname, "../build/client"),
		publicPath: "/static/"
	},
	cache: false,
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
			// { test: /\.json($|\?)/, use: 'json-loader' },
			{
				test: /\.svg$/,
				exclude: path.resolve(__dirname, "../build/fonts/"),
				loader: "svg-sprite-loader"
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					ExtractCssChunks.loader,
					{
						loader: "css-loader"
					},
					"resolve-url-loader",
					"sass-loader?sourceMap"
				]
			},
			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				use: "graphql-tag/loader"
			}
		]
	},
	resolve: {
		mainFields: ["browser", "main", "module"],
		extensions: [".js", ".css", ".scss"]
	},
	optimization: {
		splitChunks: {
			chunks: "async",
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: "~",
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	},
	plugins: [
		new WriteFilePlugin(),
		new ExtractCssChunks({
			orderWarning: true
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development")
			}
		})
	]
};
