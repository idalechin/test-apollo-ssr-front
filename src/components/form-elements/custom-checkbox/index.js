import React, { Component } from "react";
import _remove from "lodash/remove";

import Icon from "../../icon";
import CheckIcon from "./ic_check_black_24px.svg";

import "./style.scss";

export default class CustomCheckbox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isChecked: props.checked || false
		};

		this.onChange = this.onChange.bind(this);
	}

	componentWillReceiveProps(newProps) {
		const { checked } = newProps;

		if (checked !== this.props.checked) {
			this.setState({ isChecked: checked });
		}
	}

	onChange(e) {
		const { id, action, onChange } = this.props;
		const { isChecked } = this.state;
		const array = this.props.array ? this.props.array : [];

		this.setState({
			isChecked: !isChecked
		});

		function addItem(array, item, index) {
			let newArray = array.slice();
			newArray.splice(index, 0, item);
			return newArray;
		}

		function removeItem(array, index) {
			let newArray = array.slice();
			newArray.splice(index, 1);
			return newArray;
		}

		const newArray = () => {
			if (!isChecked) {
				const index = array.length ? array.length + 1 : 1;
				return addItem(array, id, index);
			} else {
				const index = array.indexOf(id);
				return removeItem(array, index);
			}
		};

		if (onChange) {
			onChange({ event: e, checked: isChecked, array: newArray() });
		}
	}

	render() {
		const checkedClass = this.state.isChecked ? "styled-checkbox__checked" : "";
		const className = this.props.className ? this.props.className : "";
		const size = this.props.size === "small" ? "styled-checkbox--small" : "";
		const { id, truncate } = this.props;
		const { isChecked } = this.state;

		return (
			<label
				className={`styled-checkbox clearfix ${checkedClass} ${className} ${size}`}
			>
				<input
					type="checkbox"
					id={id ? id : ""}
					name={id ? id : ""}
					checked={isChecked}
					onChange={e => this.onChange(e)}
				/>
				<span className="styled-checkbox__fake">
					<Icon id={CheckIcon} className="check" />
				</span>
				<span
					className={`styled-checkbox__title ${truncate ? "truncate" : ""}`}
				>
					{this.props.label}
				</span>
			</label>
		);
	}
}
