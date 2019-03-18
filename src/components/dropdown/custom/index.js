import React, { Component } from "react";

import AnimateHeight from "react-animate-height";
import _get from "lodash/get";

import Icon from "../../icon";
import IconMore from "./more.svg";
import IconArrow from "../arrow-up.svg";

import "../style.scss";
import actions from "../../../actions";
import canUseDom from "can-use-dom";

export default class CustomDropdown extends Component {
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

	renderPoints() {
		return <Icon id={IconMore} className="dropdown__more" />;
	}

	render() {
		const { showDropdown } = this.state;
		const { className, disableDropdown, id, header, top, listClass } = this.props;

		return (
			<div
				className={`dropdown dropdown ${className ? className : ""}`}
				itemID="dropdown-location"
			>
				<div
					className={`dropdown__trigger ${
						showDropdown && !disableDropdown ? "active" : ""
					}`}
					onClick={e => this.triggerClickHandler(e)}
				>
					{header ? header(showDropdown) : this.renderPoints()}
				</div>
				<AnimateHeight
					height={showDropdown && !disableDropdown ? "auto" : 0}
					duration={200}
					className={`dropdown__height-wrapper dropdown__height-wrapper--full-width dropdown__height-wrapper--zindex-3 ${
						top ? "dropdown__height-wrapper--top" : ""
					} ${listClass ? listClass : ''}`}
				>
					<div className="dropdown__container">
						<div className="dropdown__wrapper">
							<div className="dropdown__list">{this.props.children}</div>
						</div>
					</div>
				</AnimateHeight>
			</div>
		);
	}
}
