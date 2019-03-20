import React from "react";
import App from "./App";
import UniversalComponent from "./UniversalComponent";

export default [
	{
		component: App,
		routes: [
			{
				path: "/",
				key: "home",
				exact: true,
				component: () => <UniversalComponent page={() => import(`./containers/Home`)} />
			},
			{
				path: "/vendors/:page",
				key: "vendors",
				component: () => <UniversalComponent page={() => import(`./containers/vendors`)} />
			},
			{
				path: "/venues/:page",
				key: "venues",
				component: () => <UniversalComponent page={() => import(`./containers/venues`)} />
			},
			{
				path: "/vendor/:slug",
				key: "vendor",
				component: () => <UniversalComponent page={() => import(`./containers/Vendor`)} />
			},
			{
				path: "/signin",
				key: "signin",
				component: () => <UniversalComponent page={() => import(`./containers/signin-page`)} />
			}
		]
	}
];
