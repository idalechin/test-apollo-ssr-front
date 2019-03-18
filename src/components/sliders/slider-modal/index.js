import React, { Component } from "react";
import { ViewPager, Frame, Track, View } from "react-view-pager";
import _get from "lodash/get";
import SliderArrow from "./../slider-arrow";
import Video from "../../video";
import Slide from "../../slide";
import Icon from "../../icon";
import AddIcon from "./ic_add_black_24px.svg";
import LikeButton from "../../button/button-like";
import CarouselSocial from "../carousel-social-source";
import viewport from "viewport-dimensions";

import "./style.scss";
import canUseDom from "can-use-dom";
import history from "../../../history";

export default class SliderModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			prevView: null,
			slidesLength: 1
		};

		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	componentDidMount() {
		if (!canUseDom) return;
		document.addEventListener("keydown", this.handleKeyPress);
	}

	componentWillUnmount() {
		if (!canUseDom) return;
		document.removeEventListener("keydown", this.handleKeyPress);
	}

	componentWillReceiveProps() {
		this.setState({ prevView: this.props.modal.currentIndex });
	}

	handleKeyPress(e) {
		const { textareaFocus } = this.props;
		if (!textareaFocus) {
			if (e.keyCode === 39) {
				this.track.next();
			} else if (e.keyCode === 37) {
				this.track.prev();
			}
		}
	}

	onAddToCollection() {
		const { user } = this.props;
		const { currentIndex, media } = this.props.modal;
		if (user) {
			this.props.setModalData("collection", media[currentIndex]);
		} else {
			this.props.setModalData("signup");
		}
	}

	renderItem(item, index) {
		const { data, isLiked } = this.props;
		const carouselEl = document.getElementById(`carousel__frame--${data.id}`);
		const carouselWidth = carouselEl ? carouselEl.clientWidth : null;
		const wedding = _get(item, "wedding", null);
		const notNative = item ? item.notNative : true;
		const image = () => {
			if (item.isVideo) {
				return item.video_thumbnail;
			} else if (item.images) {
				return item.images.normal.src;
			} else {
				return null;
			}
		};

		return (
			<View className="single-slider-modal__slide" key={item.id || index}>
				{notNative ? null : (
					<div className="single-slider-modal__btns full-screen--sm">
						<LikeButton
							size="small"
							type="media"
							className="btn--small single-slider-modal__slide-button single-slider-modal__slide-button--small-svg"
							id={item ? item.id : null}
							isActive={isLiked}
						/>
						<button className="single-slider-modal__slide-button">
							<Icon
								id={AddIcon}
								className="single-slider-modal__slide-icon"
								onClick={this.onAddToCollection.bind(this)}
							/>
						</button>
					</div>
				)}
				<div
					className="single-slider-modal__slide-body"
					onClick={() => !item.isVideo && this.track.next()}
				>
					{item.isVideo ? (
						<Video
							videoId={item.video_hashed_id}
							onRef={ref => (this.video = ref)}
						/>
					) : (
						<Slide
							showPreloader={true}
							media={item}
							mediaSize="big"
							className="single-slider-modal__image"
						/>
					)}
				</div>
			</View>
		);
	}

	onViewChange = view => {
		const { modalId, data } = this.props;
		const { prevView } = this.state;
		const viewNumber = view[0];
		this.props.setCurrentIndex(viewNumber, modalId);

		if (prevView && data[prevView] && data[prevView].isVideo) {
			this.onPause();
		}
	};

	renderWeddingInfo(wedding) {
		return <div className="social-media-source__item-description">{`${wedding.groom_name} & ${wedding.bride_name}`}</div>;
	}

	renderLastSlide() {
		const { otherWeddings, modalId } = this.props;
		const similarWeddings = _get(otherWeddings, "similarWeddings", null);
		const photographerWeddings = _get(otherWeddings, "photographerWeddings", null);
		const photographer = _get(otherWeddings, "photographer", null);
		const geo = _get(otherWeddings, "geo", null);
		const address = geo && geo.city ? `${geo.city}${geo.state ? `, ${geo.state}` : ''}` : 'Your Location';
		const style = similarWeddings && similarWeddings.length ? _get(similarWeddings[0], 'style.name', '') : '';
		const hasSimilarWeddings = similarWeddings && similarWeddings.length;
		const hasPhotographerWeddings = photographerWeddings && photographerWeddings.length;
		const width = viewport.width();
		const isMobile = width < 768;
		const ratio = 1.5;
		const fullScreenHeight = 160;
		// 64 is sum of horizontal paddings
		const mobileHeight = (width - 64) / ratio;
		const height = isMobile ? mobileHeight : fullScreenHeight;

		if (!hasSimilarWeddings && !hasPhotographerWeddings) return null;

		return (
			<View
				className="single-slider-modal__slide single-slider-modal__slide--last"
				key="last-slide"
			>
				{photographerWeddings && photographerWeddings.length ? (
					<div className="single-slider-modal__other-wedding">
						<p className="single-slider-modal__slide-title">
							More from{" "}
							{photographer ? photographer.title : "This photographer"}
						</p>
						<CarouselSocial
							className="social-media-source__slider--margin"
							items={photographerWeddings}
							suffix="last-slide-weddings"
							height={height}
							itemRatio={1.5}
							infoTemplate={item => this.renderWeddingInfo(item)}
							interval={16}
							onClickItem={value => {
								history.push(value ? `/wedding/${value.slug}` : "/");
								this.props.closeModal(modalId);
							}}
						/>
					</div>
				) : null}

				{similarWeddings && similarWeddings.length ? (
					<div className="single-slider-modal__other-wedding">
						<p className="single-slider-modal__slide-title">
							{`Other ${style} weddings near ${address}`}
						</p>
						<CarouselSocial
							className="social-media-source__slider--margin"
							items={similarWeddings}
							suffix="last-slide-other-weddings"
							height={height}
							itemRatio={1.5}
							infoTemplate={item => this.renderWeddingInfo(item)}
							interval={16}
							onClickItem={value => {
								history.push(value ? `/wedding/${value.slug}` : "/");
								this.props.closeModal(modalId);
							}}
						/>
					</div>
				) : null}
			</View>
		);
	}

	renderSlider() {
		const { data, modal, modalId } = this.props;
		const { currentIndex } = modal;
		const width = document.documentElement.clientWidth;
		const lastSlide = this.renderLastSlide();
		const items =
			data && data.length ? data.map(this.renderItem.bind(this)) : null;

		if (lastSlide) {
			items.push(lastSlide);
		}

		if (data.length) {
			return (
				<div className="single-slider-modal">
					{currentIndex !== 0 && (
						<SliderArrow
							className="single-slider-modal__arrow single-slider-modal__arrow--prev"
							component="single-slider-modal"
							side="left"
							onClick={() => this.track.prev()}
						/>
					)}
					<ViewPager className="single-slider-modal__main">
						<Frame
							className="single-slider-modal__frame"
							id={`single-slider-modal__frame--${data.id}`}
						>
							<Track
								id={`single-slider-modal__track--${data.id}`}
								currentView={currentIndex}
								ref={c => (this.track = c)}
								viewsToShow={1}
								viewsToMove={1}
								swipe={width > 768 ? "touch" : true}
								className="single-slider-modal__track"
								onViewChange={this.onViewChange}
							>
								{items}
							</Track>
						</Frame>
					</ViewPager>
					{currentIndex !== items.length - 1 && (
						<SliderArrow
							className="single-slider-modal__arrow  single-slider-modal__arrow--next"
							component="single-slider-modal"
							side="right"
							onClick={() => this.track.next()}
						/>
					)}
				</div>
			);
		}
	}

	onPause() {
		this.video.onVideoPause();
	}

	render() {
		return <div className="single-slider-modal">{this.renderSlider()}</div>;
	}
}
