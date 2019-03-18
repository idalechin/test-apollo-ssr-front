const path = require("path");
const webpack = require("webpack");

const res = p => path.resolve(__dirname, p);

const entry = res("../src/server/serverRender.js");
const output = res("../build/server");

module.exports = {
	name: "server",
	target: "node",
	devtool: "source-map",
	entry: [entry],
	output: {
		path: output,
		filename: "main.js",
		libraryTarget: "commonjs2"
	},
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
					{
						loader: "css-loader",
						options: { minimize: true }
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
		mainFields: ["main", "module"],
		extensions: [".js", ".css", ".scss"]
	},
	optimization: {
		minimize: true,
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
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),
		new webpack.HashedModuleIdsPlugin()
	]
};
