import React, { useState } from "react";
import Icon from "../../components/icon";
import PropTypes from 'prop-types';

import "./style.scss";

const Button = props => {
	const {
		className,
		text,
		icon,
		onClick,
		toggle,
		disable,
		type,
		activeIcon
	} = props;
	const [active, setActive] = useState(false);

	function renderIcon() {
		if (activeIcon && active) {
			return <Icon id={activeIcon} className="btn__icon" />;
		} else {
			return <Icon id={icon} className="btn__icon" />;
		}
	}

	function onClickFunction(e) {
		if (!toggle && !onClick) return false;

		if (toggle) {
			setActive(!active);
		} else if (onClick) {
			onClick(e);
		}
	}

	return (
		<button
			type={type}
			className={`btn ${className ? className : ""} ${active ? "active" : ""} ${
				disable ? "disabled" : ""
			}`}
			onClick={onClickFunction}
		>
			{icon ? renderIcon() : null}
			<span className="btn__text">{text}</span>
		</button>
	);
};

Button.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
	onClick: PropTypes.func,
	toggle: PropTypes.bool,
	disable: PropTypes.bool,
  type: PropTypes.string,
  icon: PropTypes.object,
	activeIcon: PropTypes.object
};

export default Button;
