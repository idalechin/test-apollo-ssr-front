const { onError } = require("apollo-link-error");
const { createPersistedQueryLink } = require("apollo-link-persisted-queries");
const { HttpLink } = require('apollo-link-http');

module.exports.queryOrMutationLink = (config = {}) =>
	// turn on CDN support via GET
	createPersistedQueryLink({ useGETForHashedQueries: true }).concat(
		new HttpLink({
			...config,
			credentials: "same-origin"
		})
	);

module.exports.errorLink = onError(({ graphQLErrors, networkError }) => {
	/*
    onError receives a callback in the event a GraphQL or network error occurs.
    This example is a bit contrived, but in the real world, you could connect
    a logging service to the errorLink or perform a specific action in response
    to an error.
    */
	if (graphQLErrors)
		graphQLErrors.map(({ message, location, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`
			)
		);
	if (networkError) console.log(`[Network error]: ${networkError}`);
});
