const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackHotServerMiddleware = require("webpack-hot-server-middleware");
const clientConfig = require("../webpack/client.dev");
const serverConfig = require("../webpack/server.dev");
const clientConfigProd = require("../webpack/client.prod");
const serverConfigProd = require("../webpack/server.prod");
const { HTTP_API_PORT, FRONT_PORT, STATIC_FRONT_PORT } = require("./port");

const { publicPath } = clientConfig.output;
const outputPath = clientConfig.output.path;
const DEV = process.env.NODE_ENV === "development";
const app = express();

let isBuilt = false;

const done = () =>
	!isBuilt &&
	app.listen(FRONT_PORT, () => {
		isBuilt = true;
		console.log("BUILD COMPLETE -- Listening @ http://localhost:3000".magenta);
	});

if (DEV) {
	const compiler = webpack([clientConfig, serverConfig]);
	const clientCompiler = compiler.compilers.find(compiler => compiler.name === 'client');
	const options = { publicPath, serverSideRender: true };
	const devMiddleware = webpackDevMiddleware(compiler, options);

	app.use(devMiddleware);
	app.use(webpackHotMiddleware(clientCompiler));
	app.use(webpackHotServerMiddleware(compiler));

	done();
} else {
	webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
		const clientStats = stats.toJson().children[0];
		const serverRender = require("../build/server/main.js").default;

		app.use(publicPath, express.static(outputPath));
		app.use(serverRender({ clientStats }));
		done();
	});
}
