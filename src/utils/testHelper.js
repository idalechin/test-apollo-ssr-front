import React from "react";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { MockLink } from "apollo-link-mock";

export const MockClient = ({ mocks, children }) => {
	function createClient(mocks) {
		return new ApolloClient({
			cache: new InMemoryCache(),
			link: new MockLink(mocks)
		});
	}

	const client = createClient(mocks);

	return (
		<ApolloProvider client={client}>
			{children}
		</ApolloProvider>
	);
};
