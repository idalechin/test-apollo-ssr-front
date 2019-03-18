import React, { Component } from "react";
import { ViewPager, Frame, Track, View } from "react-view-pager";
import LazyLoad from "react-lazy-load";
import _get from "lodash/get";
import _shuffle from "lodash/shuffle";
import canUseDom from "can-use-dom";
import VisibilitySensor from "react-visibility-sensor";
import viewport from "viewport-dimensions";

import ImageForSlider from "../../image/image-for-slider";
import SliderArrow from "./../slider-arrow";
import Slide from "../../slide";
import AddIcon from "./ic_add_black_24px.svg";
import LikeButton from "../../button/button-like";
import VideoIcon from "./Play.svg";
import CloseIcon from "./ic_close_black_24px.svg";
import FullIcon from "./fullscreen.svg";
import Icon from "../../icon";
import Video from "../../video";
import Button from "../../button";

import { setThumbnailSize, getWeddingDescription } from "../../../functions";
import "./style.scss";

export default class Carousel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showLeftArrow: false,
			showRightArrow: false,
			showArrows: true,
			viewsToMove: 1,
			carouselWidth: null,
			index: 0,
		};

		this.onClickPhoto = this.onClickPhoto.bind(this);
		this.onClickCollection = this.onClickCollection.bind(this);
	}

	componentWillMount() {
		const { isShuffled, media } = this.props;
		this.checkRightArrow(0);
	}

	componentDidMount() {
		this.carouselUpdate();
		if (!canUseDom) return;
		window.addEventListener("resize", this.carouselUpdate.bind(this));
	}

	componentWillUnmount() {
		if (!canUseDom) return;
		window.removeEventListener("resize", this.carouselUpdate.bind(this));
	}

	carouselUpdate() {
		if (!canUseDom) return;
		const { data } = this.props;
		const carouselEl = document.getElementById(`carousel__frame--${data.id}`);
		const carouselWidth = carouselEl ? carouselEl.clientWidth : null;

		this.setState({ carouselWidth });

		// this.checkArrows();
		this.updateDimensions();
	}

	updateDimensions() {
		if (!canUseDom) return;
		const { data } = this.props;
		const carouselEl = document.getElementById(`carousel__frame--${data.id}`);
		const carouselWidth = carouselEl ? carouselEl.clientWidth : null;
		const viewsToMove = () => {
			if (carouselWidth && carouselWidth > 1200) {
				return 3;
			} else if (carouselWidth && carouselWidth > 992) {
				return 2;
			} else {
				return 1;
			}
		};

		this.setState({
			viewsToMove: viewsToMove(),
			carouselWidth,
		});
	}

	checkArrows = () => {
		if (!canUseDom) return;
		const { data } = this.props;
		const frame = document.getElementById(`carousel__frame--${data.id}`);
		const track = document.getElementById(`carousel__track--${data.id}`);
		const frameWidth = frame ? frame.offsetWidth : null;
		const trackWidth = track ? track.offsetWidth : null;

		const showArrows = frameWidth && trackWidth && trackWidth >= frameWidth;
		this.setState({ showArrows });
	};

	onClickPhoto(data, media, index) {
		const { beforeOnClick, notShowModal } = this.props;

		if (notShowModal) return;

		if (beforeOnClick) beforeOnClick();

		this.props.setModalData("photo", data, media, index);
	}

	onClickCollection(data) {
		if (this.props.user) {
			this.props.setModalData("collection", data);
		} else {
			this.props.setModalData("signup");
		}
	}

	checkLeftArrow = viewNumber => {
		this.setState({ showLeftArrow: viewNumber !== 0 });
	};

	checkRightArrow = viewNumber => {
		const { media } = this.props;
		if (media && media.length) this.setState({ showRightArrow: viewNumber !== media.length - 1 });
	};

	onViewChange = view => {
		const viewNumber = view[0];
		this.checkLeftArrow(viewNumber);
		this.checkRightArrow(viewNumber);
		this.setState({ index: viewNumber });
	};

	renderImage(item, image, height) {
		const { carouselWidth } = this.state;
		const carouselIsMobile = carouselWidth && carouselWidth <= 600;

		if (item.isVideo) {
			return (
				<VisibilitySensor>
					{({ isVisible }) => (
						<Video
							videoId={item.video_hashed_id}
							muted="true"
							preload="true"
							qualityMax="480"
							qualityMin="480"
							playbar="false"
							endVideoBehavior="loop"
							playButton="false"
							playbar="false"
							hideBottomBar={true}
							play={isVisible}
							videoAutoplay={true}
							videoFoam="false"
							fullSize={true}
							autoPlay={true}
						/>
					)}
				</VisibilitySensor>
			);
		}

		return carouselIsMobile ? (
			<Slide media={item} mediaSize="normal" className="single-slider-modal__image" />
		) : (
			<ImageForSlider image={image.src} className="carousel__slide-text" height={height}/>
		);
	}

	renderItem(item, index) {
		const { data, media, like, user, interval, onClickDelete, hideButtons, height } = this.props;
		const { carouselWidth } = this.state;
		const defaultHeight = _get(item, 'images.normal.height', null);
		const isLiked = like && like.length ? like.some(el => el.id === item.id) : false;
		const carouselIsMobile = carouselWidth && carouselWidth <= 600;
		const marginRight = interval !== undefined ? interval : 8;
		const wedding = _get(item, "wedding", null);
		const widthRatio = height ? height / defaultHeight : 1;
		const carouselHeight = carouselIsMobile ? 400 : height;

		const image = () => {
			if (item.isVideo) {
				return {
					src: setThumbnailSize(item.video_thumbnail, 460 * widthRatio, height),
					width: 460 * widthRatio,
				};
			} else if (item.images) {
				const picWidth = item.images.normal.width * widthRatio;
				return {
					src: item.images.normal.src,
					width: picWidth,
				};
			} else {
				return null;
			}
		};

		const imageWidth = item.isVideo ? height * 1.7 : 'auto';
		const notNative = item.notNative;
		const width = index + 1 === media.length ? `${imageWidth}px` : `${imageWidth + marginRight}px`;

		const style = carouselIsMobile ? { width: carouselWidth, minWidth: carouselWidth } : { width: imageWidth, minWidth: imageWidth };

		if (!image()) return null;

		const slide = (
			<View className="carousel__slide" key={item ? item.id : index} style={style}>
				<LazyLoad height={height} debounce={false} offsetHorizontal={carouselWidth * 2}>
					<div className="carousel__slide-body" style={{height: height || defaultHeight}}>
						<div className="carousel__slide-hover" onClick={e => this.onClickPhoto(data, media, index)} />

						<div className="carousel__slide-buttons">
							{hideButtons || notNative ? null : (
								<div className="carousel__slide-buttons--left">
									<LikeButton
										size="small"
										type="media"
										className="btn--small carousel__slide-button"
										id={item ? item.id : null}
										isActive={isLiked}
									/>
									<button className="carousel__slide-button">
										<Icon id={AddIcon} className="carousel__slide-icon" onClick={() => this.onClickCollection(item)} />
									</button>
								</div>
							)}

							{onClickDelete && (
								<button className="carousel__slide-button carousel__slide-button--red">
									<Icon id={CloseIcon} className="carousel__slide-icon" onClick={() => onClickDelete(item, data)} />
								</button>
							)}
						</div>

						{this.renderImage(item, image(), height)}
					</div>
				</LazyLoad>
			</View>
		);

		return slide;
	}

	renderFullScreenBtn() {
		const { data, media } = this.props;
		const { index } = this.state;
		const width = viewport.width();

		if (width >= 600) return null;

		return (
			<Button
				icon={FullIcon}
				className="btn--round btn--only-icon btn--shadow carousel__fullscreen-button"
				onClick={e => this.onClickPhoto(data, media, index)}
			/>
		);
	}

	render() {
		const { media, data } = this.props;
		const { showLeftArrow, showRightArrow, showArrows, viewsToMove, className } = this.state;

		if (!media || !media.length || !data) return null;

		const items = media && media.length ? media.map(this.renderItem.bind(this)) : null;

		if (items && items.length) {
			return (
				<div className={`carousel ${className ? className : ""}`}>
					{showLeftArrow && showArrows ? (
						<SliderArrow
							className="carousel__arrow carousel__arrow--prev"
							component="carousel"
							side="left"
							onClick={() => this.track.prev()}
						/>
					) : null}
					<ViewPager tag="div" className="carousel__main">
						<Frame className="carousel__frame" id={`carousel__frame--${data.id}`}>
							<Track
								id={`carousel__track--${data.id}`}
								ref={c => (this.track = c)}
								viewsToShow={"auto"}
								viewsToMove={viewsToMove}
								infinite={false}
								className="carousel__track"
								contain={true}
								swipe={"touch"}
								onViewChange={this.onViewChange}>
								{items}
							</Track>
						</Frame>
					</ViewPager>
					{showRightArrow && showArrows ? (
						<SliderArrow
							className="carousel__arrow  carousel__arrow--next"
							component="carousel"
							side="right"
							onClick={() => this.track.next()}
						/>
					) : null}
					{this.renderFullScreenBtn()}
				</div>
			);
		} else {
			return null;
		}
	}
}
