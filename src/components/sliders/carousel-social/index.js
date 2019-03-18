import React, { Component } from "react";
import { ViewPager, Frame, Track, View } from "react-view-pager";
import LazyLoad from "react-lazy-load";
import _get from "lodash/get";
import _find from "lodash/find";
import _isEqual from "lodash/isEqual";
import canUseDom from "can-use-dom";
import Truncate from "react-text-truncate";

import ImageForSlider from "../../image/image-for-slider";
import SliderArrow from "./../slider-arrow";
import Slide from "../../slide";
import VideoIcon from "./Play.svg";
import CheckIcon from "./check.svg";
import CloseIcon from "./ic_close_black_24px.svg";
import Icon from "../../icon";

import { setThumbnailSize, getWeddingDescription } from "../../../functions";
import "./style.scss";

export default class CarouselSocial extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showLeftArrow: false,
			showRightArrow: false,
			showArrows: true,
			viewsToMove: 1,
			carouselWidth: null,
		};

		this.onClickPhoto = this.onClickPhoto.bind(this);
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

	componentWillReceiveProps(newProps){
		const {media} = newProps;
		const oldMedia = this.props.media;

		if (!_isEqual(media, oldMedia)) {			
			this.carouselUpdate();
		}

		if(media && media.length && oldMedia && oldMedia.length && media.length < oldMedia.length) {			
			this.track.scrollTo(0)
		}
	}

	componentWillUnmount() {
		if (!canUseDom) return;
		window.removeEventListener("resize", this.carouselUpdate.bind(this));
	}

	carouselUpdate() {		
		if (!canUseDom) return;
		const { data } = this.props;
		const carouselEl = document.getElementById(`carousel-social__frame--${data.id}`);
		const carouselWidth = carouselEl ? carouselEl.clientWidth : null;

		this.setState({ carouselWidth });

		// this.checkArrows();
		this.updateDimensions();
	}

	updateDimensions(carouselWidth) {
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
		const frame = document.getElementById(`carousel-social__frame--${data.id}`);
		const track = document.getElementById(`carousel-social__track--${data.id}`);
		const frameWidth = frame ? frame.offsetWidth : null;
		const trackWidth = track ? track.offsetWidth : null;
		const currentIndex = _get(this, 'track.context.pager.currentIndex', 0);
		const showArrows = frameWidth && trackWidth && trackWidth >= frameWidth;

		this.checkLeftArrow(currentIndex);
		this.checkRightArrow(currentIndex);
		this.setState({showArrows});
	};

	onClickPhoto(data, media, index) {
		const { beforeOnClick, notShowModal, onClickMedia } = this.props;

		if (beforeOnClick) beforeOnClick(media, index);
		if (onClickMedia) onClickMedia(media[index]);
	}

	checkLeftArrow = viewNumber => {
		this.setState({ showLeftArrow: viewNumber !== 0 });
	};

	checkRightArrow = viewNumber => {
		const { media } = this.props;
		if(media && media.length) this.setState({ showRightArrow: viewNumber !== media.length - 1 });
	};

	onViewChange = view => {
		const viewNumber = view[0];
		this.checkLeftArrow(viewNumber);
		this.checkRightArrow(viewNumber);
	};

	renderItem(item, index) {
		const { data, media, like, user, interval, onClickDelete, hideButtons, showDescription, checkedMedia, height = 280 } = this.props;
		const { carouselWidth } = this.state;
		const isLiked = like && like.length ? like.some(el => el.id === item.id) : false;
		const isChecked = checkedMedia && checkedMedia.length && _find(checkedMedia, {'id': item.id});
		const checkedClass = isChecked ? 'checked' : 'not-checked';
		const carouselIsMobile = carouselWidth && carouselWidth <= 600;
		const marginRight = interval !== undefined ? interval : 8;
		const wedding = _get(item, "wedding", null);
		const defaultHeight = _get(item, 'images.normal.height', null) || 280;
		const currentHeight = height || defaultHeight;
		const widthRatio = height ? height / defaultHeight : 1;

		const image = () => {
			if (item.isVideo) {
				return { src: setThumbnailSize(item.video_thumbnail, 460, 280), width: 460 * widthRatio };
			} else if (item.images) {				
				return { src: item.images.normal.src, width: item.images.normal.width * widthRatio };
			} else {
				return null;
			}
		};

		const imageWidth = item.isVideo ? height * 1.7 : 'auto';
		const width = index + 1 === media.length ? `${imageWidth}px` : `${imageWidth + marginRight}px`;
		const style = carouselIsMobile ? { width: carouselWidth, minWidth: carouselWidth } : { width: imageWidth, minWidth: imageWidth };

		if (!image()) return null;

		const slide = (
			<View className={`carousel-social__slide ${checkedMedia ? checkedClass : ''}`} key={item ? item.id : index} style={style}>
				<LazyLoad height={height} debounce={false} offsetHorizontal={carouselWidth * 2}>
					<div className="carousel-social__slide-body" style={{height: height}}>
						<div className="carousel-social__slide-hover" onClick={e => this.onClickPhoto(data, media, index)} />

						{!hideButtons && (
							<div className="carousel-social__slide-buttons">
								<button className="carousel-social__slide-button carousel-social__slide-button--red">
									<Icon id={CloseIcon} className="carousel-social__slide-icon" onClick={() => onClickDelete(item, data)} />
								</button>
							</div>
						)}

						{item.isVideo ? (
							<Icon className="carousel-social__video-icon" id={VideoIcon} onClick={e => this.onClickPhoto(data, media, index)} />
						) : null}

						{carouselIsMobile ? (
							<Slide media={item} mediaSize="normal" className="single-slider-modal__image" />
						) : (
							<ImageForSlider image={image().src} className="carousel-social__slide-text" />
						)}

						{showDescription && item.note && item.note.length ? (
							<div className="carousel-social__media-description">
								<Truncate line={3} text={item.note} />
							</div>
						) : null}

						{isChecked && <Icon id={CheckIcon} className="carousel-social__check"/>}
					</div>
				</LazyLoad>
			</View>
		);

		return slide;
	}

	render() {
		const { media, data, height = 280, className } = this.props;
		const { showLeftArrow, showRightArrow, showArrows, viewsToMove } = this.state;

		if (!media || !media.length || !data) return null;

		const items = media && media.length ? media.map(this.renderItem.bind(this)) : null;

		if (items && items.length) {
			return (
				<div className={`carousel-social ${className ? className : ""}`}>
					{showLeftArrow && showArrows ? (
						<SliderArrow
							className="carousel-social__arrow carousel-social__arrow--prev"
							component="carousel-social"
							side="left"
							onClick={() => this.track.prev()}
						/>
					) : null}
					<ViewPager tag="div" className="carousel-social__main">
						<Frame className="carousel-social__frame" id={`carousel-social__frame--${data.id}`} style={{height: height, maxHeight: height}}>
							<Track
								id={`carousel-social__track--${data.id}`}
								ref={c => (this.track = c)}
								viewsToShow={"auto"}
								viewsToMove={viewsToMove}
								infinite={false}
								className="carousel-social__track"
								contain={true}
								swipe={"touch"}
								onViewChange={this.onViewChange}
								style={{height: height}}>
								{items}
							</Track>
						</Frame>
					</ViewPager>
					{showRightArrow && showArrows ? (
						<SliderArrow
							className="carousel-social__arrow  carousel-social__arrow--next"
							component="carousel-social"
							side="right"
							onClick={() => this.track.next()}
						/>
					) : null}
				</div>
			);
		} else {
			return null;
		}
	}
}
