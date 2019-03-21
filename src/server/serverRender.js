import { renderRoutes } from "react-router-config";
import Cookies from "js-cookie";
import routes from "../routes";
import React from "react";
import ReactDOM from "react-dom/server";
import { Router } from "react-router";
import createHistory from "history/createMemoryHistory";

import { clearChunks, flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";
import Html from "../containers/Html";

import ApolloClient from "apollo-client";
import { ApolloProvider, renderToStringWithData } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import fetch from "node-fetch";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { getID } from "../utils/inMemory";
import clientConfigDev from "../../webpack/client.dev";
import clientConfigProd from "../../webpack/client.prod";
const outputPathDev = clientConfigDev.output.path;
const outputPathProd = clientConfigProd.output.path;

const { HTTP_API_PORT } = require("../port");

import { errorLink, queryOrMutationLink } from "./links";

const links = [
	errorLink,
	queryOrMutationLink({
		fetch,
		uri: `http://localhost:${HTTP_API_PORT}/graphql`
	})
];

// support APQ in production
if (process.env.NODE_ENV === "production") {
	links.unshift(createPersistedQueryLink());
}

const authLink = setContext((_, { headers }) => {
	const token = Cookies.get("token");
	return {
		headers: {
			...headers,
			authorization: token ? token : ""
		}
	};
});

export default ({ clientStats }) => (req, res, next) => {
	const history = createHistory({ initialEntries: [req.path] });

	const client = new ApolloClient({
		ssrMode: true,
		link: authLink.concat(ApolloLink.from(links)),
		cache: new InMemoryCache({
			dataIdFromObject: obj => getID(obj)
		})
	});

	const initialState = client.cache.extract();

	const component = (
		<ApolloProvider client={client}>
			<ApolloHooksProvider client={client}>
				<Router history={history}>{renderRoutes(routes)}</Router>
			</ApolloHooksProvider>
		</ApolloProvider>
	);

	renderToStringWithData(component, initialState)
		.then(content => {
			// clearChunks();
			const chunkNames = flushChunkNames();
			const {
				Js,
				Styles,
				cssHash,
				publicPath,
				scripts,
				stylesheets
			} = flushChunks(clientStats, {
				chunkNames,
				outputPath:
					process.env.NODE_ENV === "production" ? outputPathProd : outputPathDev
			});

			const htmlProps = {
				Js,
				Styles,
				cssHash,
				client,
				content,
				publicPath
			};

			// console.log("DYNAMIC CHUNK NAMES RENDERED", chunkNames);
			// console.log("SCRIPTS SERVED", scripts);
			// console.log("STYLESHEETS SERVED", stylesheets);

			res.status(200);
			const html = <Html {...htmlProps} />;
			res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
			res.end();
		})
		.catch(e => {
			console.error("RENDERING ERROR:", e); // eslint-disable-line no-console
			res.status(500);
			res.end(
				`An error occurred. Please submit an issue to [https://github.com/apollographql/GitHunt-React] with the following stack trace:\n\n${
					e.stack
				}`
			);
		});
};
