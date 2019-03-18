import React, { Component } from "react";
import Icon from "../icon";
import IconArrowNext from './arrow-next.svg';
import IconArrowPrev from './arrow-prev.svg';

export default class SliderArrow extends Component {
	render() {
		const { className, onClick, side, component } = this.props;

		return (
      <div 
        className={`${component}__arrow-wrapper ${component}__arrow-wrapper--${side}`}
        onClick={onClick}
      >
			  <div className={`${component}__arrow-hover ${component}__arrow-hover--${side}`}/>
				<button
					className={className}
					type='button'
					style={{ cursor: "pointer" }}
				>
					<Icon
					  id={side === 'left' ? IconArrowPrev : IconArrowNext}
						className={`${component}__arrow-icon ${component}__arrow-icon--${side}`}
					/>
				</button>
			</div>
		);
	}
}
