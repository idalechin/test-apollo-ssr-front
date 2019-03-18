import React, { Component } from "react";
import { ViewPager, Frame, Track, View } from "react-view-pager";
import _get from "lodash/get";
import viewport from 'viewport-dimensions';

import SliderArrow from "./../slider-arrow";
import Slide from "../../slide";
import Icon from "../../icon";
import Review from "../../review";

import "./style.scss";

export default class CarouselReviews extends Component {
	constructor(props) {
		super(props);
		const reviews = props.data.reviews;		
		const hasReviews = reviews && reviews.length;

		this.state = {
			showLeftArrow: false,
			showRightArrow: hasReviews,
			showArrows: hasReviews,
			reviews
		};
	}

	componentWillMount() {
		this.checkRightArrow(0);
	}

	checkLeftArrow = viewNumber => {
		this.setState({ showLeftArrow: viewNumber !== 0 });
	};

	checkRightArrow = viewNumber => {
		const {reviews} = this.state;
		if(reviews && reviews.length) this.setState({ showRightArrow: viewNumber !== reviews.length - 1 });
	};

	onViewChange = (view) => {
		const viewNumber = view[0];
		this.checkLeftArrow(viewNumber);
		this.checkRightArrow(viewNumber);
	};

	renderItem(item, index) {
		if (!item) return null;

		const slide = (
			<View className="carousel-reviews__slide" key={index}>
				<Review data={item} />
			</View>
		);

		return slide;
	}

	renderSlider() {
		const { data } = this.props;
		const { showLeftArrow, showRightArrow, showArrows, viewsToMove, reviews } = this.state;
		const width = viewport.width();

		if (!reviews) return null;

		const items = reviews.map(this.renderItem.bind(this));

		if (items && items.length) {
			return (
				<div className="carousel-reviews__wrapper">
					{showLeftArrow && showArrows ? (
						<SliderArrow
							className="carousel-reviews__arrow carousel-reviews__arrow--prev"
							component="carousel-reviews"
							side="left"
							onClick={() => this.track.prev()}
						/>
					) : null}
					<ViewPager className="carousel-reviews__main">
						<Frame className="carousel-reviews__frame" id={`carousel-reviews__frame--${data.id}`}>
							<Track
								id={`carousel-reviews__track--${data.id}`}
								ref={c => (this.track = c)}
								viewsToShow={1}
								viewsToMove={1}
								swipe={width > 768 ? "touch" : true}
								className="carousel-reviews__track"
								onViewChange={this.onViewChange}>
								{items}
							</Track>
						</Frame>
					</ViewPager>
					{showRightArrow && showArrows ? (
						<SliderArrow
							className="carousel-reviews__arrow  carousel-reviews__arrow--next"
							component="carousel-reviews"
							side="right"
							onClick={() => this.track.next()}
						/>
					) : null}
				</div>
			);
		}
	}

	render() {
		const { className, label, data } = this.props;
		const { reviews } = this.state;
		
		if(!reviews || !reviews.length) return null;

		return (
			<div className={`carousel-reviews__wrapper ${className ? className : ""}`}>
				{label && <p className="carousel-reviews__label">{label}</p>}
				<div className={`carousel-reviews `}>{this.renderSlider()}</div>
			</div>
		);
	}
}
