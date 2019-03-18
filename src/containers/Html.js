import React from "react";
import JsxParser from 'react-jsx-parser'

const Html = ({ content, client: { cache }, Js, Styles, cssHash }) => {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>SSRExample</title>
				<link href="https://fonts.googleapis.com/css?family=Alegreya+Sans|Open+Sans:400,700,900" rel="stylesheet"/>
        <Styles/>
			</head>
			<body>
				<div id="content" dangerouslySetInnerHTML={{ __html: content }} />
				<script
					charSet="UTF-8"
					dangerouslySetInnerHTML={{
						__html: `window.__APOLLO_STATE__=${JSON.stringify(
							cache.extract()
						)};`
					}}
				/>
        <JsxParser renderInWrapper={false} jsx={cssHash.toString()}/>
        <Js/>
			</body>
		</html>
	);
};

export default Html;
