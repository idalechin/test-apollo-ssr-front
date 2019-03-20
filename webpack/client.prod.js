const path = require("path");
const webpack = require("webpack");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	name: "client",
	target: "web",
	devtool: "source-map",
	entry: [path.resolve(__dirname, "../src/client.js")],
	output: {
		filename: "[name].[chunkhash].js",
		chunkFilename: "[name].[chunkhash].js",
		path: path.resolve(__dirname, "../build/client"),
		publicPath: "/static/"
	},
	stats: "verbose",
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
	mode: "production",
	resolve: {
		mainFields: ["browser", "main", "module"],
		extensions: [".js", ".css", ".scss"]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
						output: {
								comments: false,
								ascii_only: true
						},
						compress: {
								comparisons: false
						}
				}
		})
		],
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
		new ExtractCssChunks({
			orderWarning: true
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),
		new webpack.HashedModuleIdsPlugin() // not needed for strategy to work (just good practice)
	]
};
