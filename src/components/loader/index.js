import React from "react";
import "./style.scss";
import Icon from "../icon";
import {Pulse} from 'better-react-spinkit'

export default props => {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				boxSizing: "border-box",
				position: 'absolute',
				left: 0,
				right: 0,
				top: 0,
				bottom:0,
				textAlign: "center",
				background: "transition",
				display: "flex",
				justifyContent: "center",
        alignItems: "center",
			}}
			{...props}
		>
		  <Pulse size={100} color='#55B8F6' />
		</div>
	);
};
