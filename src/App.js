import React from "react";
import _get from "lodash/get";
import { Route, Switch } from "react-router";
import Header from "./components/header";
import { renderRoutes } from "react-router-config";
import { StateProvider } from './state';
import reducers from './reducers/reducers'
import initialState from './reducers/initialState'

import "./style/main.scss";

const App = ({ route }) => (
	<StateProvider initialState={initialState} reducer={reducers}>
		<Header />
		<div style={{
			paddingTop: 66,
			minHeight: 'calc(100vh - 66px)',
			display: 'flex',
			alignItems: 'stretch',
			position: 'relative',
		}}>
			<Switch>{renderRoutes(route.routes)}</Switch>
		</div>
	</StateProvider>
);

export default App;
