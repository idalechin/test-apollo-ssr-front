import React, { Component } from "react";

import AnimateHeight from "react-animate-height";
import _get from "lodash/get";

import Icon from "../../icon";
import IconMore from "./more.svg";
import IconArrow from "../arrow-up.svg";

import "../style.scss";
import actions from "../../../actions";
import canUseDom from "can-use-dom";

export default class CustomCaretDropdown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showDropdown: false
		};

		this.triggerClickHandler = this.triggerClickHandler.bind(this);
		this.documentClickHandler = this.documentClickHandler.bind(this);
		this.stopClickHandler = this.stopClickHandler.bind(this);
	}

	componentDidMount() {
		document.addEventListener("click", this.documentClickHandler);
	}

	componentWillUnmount() {
		if (!canUseDom) return;
		document.removeEventListener("click", this.documentClickHandler);
	}

	componentWillReceiveProps(newProps){
		const {showDropdown, children} = newProps;

		if(showDropdown !== this.props.showDropdown){
			this.setState({showDropdown})
		}

		if(children && !this.props.children){
			this.setState({showDropdown: true})
		}

		if(!children){
			this.setState({showDropdown: false})
		}
	}

	onOptionSelected(item) {
		const { onOptionSelected } = this.props;
		onOptionSelected && onOptionSelected(item);
		this.setState({ showDropdown: false });
	}

	onShowDropdown() {
		this.setState({ showDropdown: true });
	}

	documentClickHandler() {
		this.setState({ showDropdown: false });
	}

	triggerClickHandler(e) {
		e.nativeEvent.stopImmediatePropagation();
		this.setState({ showDropdown: !this.state.showDropdown });
	}

	stopClickHandler(e) {
		e.nativeEvent.stopImmediatePropagation();
		this.setState({ showDropdown: this.state.showDropdown });
	}

	render() {
		const { showDropdown } = this.state;
		const { className, disableDropdown, top, left, id } = this.props;
		const style = { top, left, position: 'absolute' };

		return (
			<div
				className={`dropdown dropdown ${className ? className : ""}`}
				itemID={id}
				style={style}
			>
				<AnimateHeight
					height={showDropdown && !disableDropdown ? "auto" : 0}
					duration={200}
					className={`dropdown__height-wrapper dropdown__height-wrapper--zindex-3 dropdown__height-wrapper--background dropdown__height-wrapper--left`}
				>
					<div className="dropdown__container">
						<div className="dropdown__wrapper">
							<div className="dropdown__list dropdown__list--scroll">{this.props.children}</div>
						</div>
					</div>
				</AnimateHeight>
			</div>
		);
	}
}
