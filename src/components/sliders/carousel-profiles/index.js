import React, { Component } from "react";
import { ViewPager, Frame, Track, View } from "react-view-pager";
import _get from "lodash/get";
import viewport from "viewport-dimensions";

import SliderArrow from "./../slider-arrow";
import AddIcon from "./ic_add_black_24px.svg";
import Icon from "../../icon";
import SocialMediaProfile from "../../social-media/profile";

import "./style.scss";

export default class CarouselProfiles extends Component {
	constructor(props) {
		super(props);
		const profiles = props.profiles;
		const hasProfiles = profiles && profiles.length;

		this.state = {
			showLeftArrow: false,
			showRightArrow: hasProfiles,
			showArrows: hasProfiles,
			profiles,
		};
	}

	componentWillMount() {
		this.checkRightArrow(0);
	}

	checkLeftArrow = viewNumber => {
		this.setState({ showLeftArrow: viewNumber !== 0 });
	};

	checkRightArrow = viewNumber => {
		const { profiles } = this.state;
		if (profiles && profiles.length) this.setState({ showRightArrow: viewNumber !== profiles.length - 1 });
	};

	onViewChange = view => {
		const viewNumber = view[0];
		this.checkLeftArrow(viewNumber);
		this.checkRightArrow(viewNumber);
	};

	renderItem(item, index) {
		const { activeAccount } = this.props;
		const checked = activeAccount && activeAccount.id === item.id;

		if (!item) return null;

		const slide = (
			<View className="carousel-profiles__slide" key={index}>
				<SocialMediaProfile key={item.id} profile={item} checked={checked} onClick={profile => this.props.onProfileClick(profile)} />
			</View>
		);

		return slide;
	}

	renderSlider() {
		const { profiles } = this.props;
		const { showLeftArrow, showRightArrow, showArrows, viewsToMove } = this.state;
		const width = viewport.width();

		if (!profiles) return null;

		const items = profiles.map(this.renderItem.bind(this));

		const btn = (
			<View className="carousel-profiles__slide" key={profiles.length + 1}>
				<div className={`social-media-profile`}>
					<a className="social-media-profile__profile-userpic-wrapper carousel-profiles__link" target="_blank" href="https://buffer.com/app/profile/connect">
						<Icon id={AddIcon} className='carousel-profiles__icon'/>
					</a>
					<p className="truncate social-media-profile__name">Add Profile</p>
				</div>
			</View>
		);

		items.push(btn);

		if (items && items.length) {
			return (
				<div className="carousel-profiles__wrapper">
					{showLeftArrow && showArrows ? (
						<SliderArrow
							className="carousel-profiles__arrow carousel-profiles__arrow--prev"
							component="carousel-profiles"
							side="left"
							onClick={() => this.track.prev()}
						/>
					) : null}
					<ViewPager className="carousel-profiles__main">
						<Frame className="carousel-profiles__frame" id={`carousel-profiles__frame--profiles-slider`}>
							<Track
								id={`carousel-profiles__track--carousel-profiles__frame--profiles-slider`}
								ref={c => (this.track = c)}
								viewsToMove={1}
								viewsToShow="auto"
								swipe={width > 768 ? "touch" : true}
								className="carousel-profiles__track"
								contain={true}
								onViewChange={this.onViewChange}>
								{items}
							</Track>
						</Frame>
					</ViewPager>
					{showRightArrow && showArrows ? (
						<SliderArrow
							className="carousel-profiles__arrow  carousel-profiles__arrow--next"
							component="carousel-profiles"
							side="right"
							onClick={() => this.track.next()}
						/>
					) : null}
				</div>
			);
		}
	}

	render() {
		const { className, profiles } = this.props;

		if (!profiles || !profiles.length) return null;

		return (
			<div className={`carousel-profiles__wrapper ${className ? className : ""}`}>
				<div className={`carousel-profiles `}>{this.renderSlider()}</div>
			</div>
		);
	}
}
