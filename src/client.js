import React from "react";
import { hydrate } from "react-dom";
import { Router } from "react-router";
import { renderRoutes } from "react-router-config";
import routes from "./routes";
import history from "./history";
import fetch from "node-fetch";
import _get from "lodash/get";
import { getID } from "./utils/inMemory";
import Cookies from "js-cookie";

import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from 'apollo-cache-persist';
import localForage from 'localforage';
import { API_URI, HTTP_API_PORT, WS_API_PORT } from "./constants";

import "@babel/polyfill";

import {
	errorLink,
	queryOrMutationLink,
	subscriptionLink,
	requestLink
} from "./server/links";

const links = [
	errorLink,
	requestLink({
		queryOrMutationLink: queryOrMutationLink({
			fetch,
			uri: `${API_URI}/graphql`
		}),
		subscriptionLink: subscriptionLink(WS_API_PORT)
	})
];

const cache = new InMemoryCache({
	dataIdFromObject: obj => getID(obj)
}).restore(window.__APOLLO_STATE__)

persistCache({
  cache,
  storage: localForage,
});

const authLink = setContext((_, { headers }) => {
	const token = Cookies.get("token");
	return {
		headers: {
			...headers,
			authorization: token ? token : ""
		}
	};
});

const client = new ApolloClient({
	cache,
	link: authLink.concat(ApolloLink.from(links)),
	ssrForceFetchDelay: 100,
	connectToDevTools: true
});

hydrate(
	<ApolloProvider client={client}>
		<ApolloHooksProvider client={client}>
			<Router history={history}>{renderRoutes(routes)}</Router>
		</ApolloHooksProvider>
	</ApolloProvider>,
	document.getElementById("content")
);

