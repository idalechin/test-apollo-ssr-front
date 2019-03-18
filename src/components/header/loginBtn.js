import React, { useState } from "react";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";
import _get from "lodash/get";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import Button from "../button";

import "./style.scss";

const LoginBtn = props => {
	const { data, client } = props
	const user = _get(data, "fetchMe", null);

	const logout = () => {
		Cookies.remove("token");
		client.resetStore();
	};

	if (user) {
		return (
			<Button
				className="btn--extra-small btn--without-margin"
				text="Log Out"
				onClick={() => logout()}
			/>
		);
	}

	return (
		<Link
			className="btn--extra-small btn--secondary btn--vert-center"
			to="/signin"
		>
			Login
		</Link>
	);
};

const FETCH_USER = gql`
	query {
		fetchMe {
			id
		}
	}
`;

export default withApollo(
	graphql(FETCH_USER, {
		options: {
			ssr: false
		}
	})(LoginBtn)
);
