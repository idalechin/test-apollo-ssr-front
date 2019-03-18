import React, { Component } from "react";
import { ViewPager, Frame, Track, View } from "react-view-pager";
import LazyLoad from "react-lazy-load";
import _get from "lodash/get";
import canUseDom from "can-use-dom";
import observe from '@jurca/react-dom-observe'

import SliderArrow from "./../slider-arrow";
import CheckIcon from "./check.svg";
import Icon from "../../icon";
import MosaicCard from '../../cards/mosaic-card';

import "./style.scss";

export default class CarouselSocialSocial extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showLeftArrow: false,
			showRightArrow: false,
			showArrows: true,
			viewsToMove: 1,
			carouselWidth: null,
		};

		this.onClickItem = this.onClickItem.bind(this);
	}

	componentWillMount() {
		this.checkRightArrow(0);
	}

	componentDidMount() {
		if (!canUseDom) return;
		window.addEventListener("resize", this.carouselUpdate.bind(this));
	}

	componentWillReceiveProps(newProps){
		const {items} = newProps;
		const oldItems = this.props.items;

		this.carouselUpdate();

		if(items && items.length && oldItems && oldItems.length && items.length !== oldItems.length) {			
			this.track.scrollTo(0);
		}
	}

	componentWillUnmount() {
		if (!canUseDom) return;
		window.removeEventListener("resize", this.carouselUpdate.bind(this));
	}

	carouselUpdate() {		
		if (!canUseDom) return;
		const { suffix } = this.props;
		const carouselEl = document.getElementById(`carousel-social-source__frame--${suffix}`);
		const carouselWidth = carouselEl ? carouselEl.clientWidth : null;

		this.setState({ 
			carouselWidth,
		});

		this.checkArrows();
		this.updateDimensions(carouselWidth);
	}

	updateDimensions(carouselWidth) {
		const viewsToMove = () => {
			if (carouselWidth && carouselWidth > 1200) {
				return 2;
			} else if (carouselWidth && carouselWidth > 600) {
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
		const { suffix } = this.props;
		const frame = document.getElementById(`carousel-social-source__frame--${suffix}`);
		const track = document.getElementById(`carousel-social-source__track--${suffix}`);
		const frameWidth = frame ? frame.offsetWidth : null;
		const trackWidth = track ? track.offsetWidth : null;
		const currentIndex = _get(this, 'track.context.pager.currentIndex', 0);
		const showArrows = frameWidth && trackWidth && trackWidth >= frameWidth;

		this.checkLeftArrow(currentIndex);
		this.checkRightArrow(currentIndex);
		this.setState({showArrows});
	};

	onClickItem(items, index) {
		const { beforeOnClick, onClickItem } = this.props;

		if (beforeOnClick) beforeOnClick(items, index);
		if (onClickItem) onClickItem(items[index]);
	}

	checkLeftArrow = viewNumber => {
		this.setState({ showLeftArrow: viewNumber !== 0 });
	};

	checkRightArrow = viewNumber => {
		const { items } = this.props;
		if(items && items.length) this.setState({ showRightArrow: viewNumber !== items.length - 1 });
	};

	onViewChange = view => {
		const viewNumber = view[0];
		this.checkLeftArrow(viewNumber);
		this.checkRightArrow(viewNumber);
	};

	renderItem(item, index) {
		const { items, interval, getCheck, height, width, itemTemplate, itemRatio, infoTemplate } = this.props;
		const { carouselWidth } = this.state;
		const isChecked = getCheck ? getCheck(item) : false;
		const checkedClass = isChecked ? 'checked' : 'not-checked';
		const carouselIsMobile = carouselWidth && carouselWidth <= 400;
		const itemInterval = interval !== undefined ? interval : 8;
		const defaultHeight = 140;
		const itemHeight = height || defaultHeight;
		const ratio = itemRatio || 1.5;
		const currentWidth = width ? width : itemHeight * ratio ;		
		const itemWidth = index + 1 === items.length ? `${currentWidth}px` : `${currentWidth + itemInterval}px`;
		const marginRight = index + 1 === items.length ? 0 : itemInterval;		
		const style = carouselIsMobile ? { width: carouselWidth, minWidth: carouselWidth  } : { width: itemWidth, minWidth: itemWidth };

		return (
			<View className={`carousel-social-source__slide ${isChecked ? checkedClass : ''}`} key={index} style={style}>
				<LazyLoad height={itemHeight} debounce={false} offsetHorizontal={carouselWidth > 992 ? 1200 : 400}>
					<div className="carousel-social-source__slide-body" style={{height: itemHeight}}>

						{itemTemplate ? itemTemplate(item) : <MosaicCard	data={item} videoAutoplay={true}/>}
						
						<div className="carousel-social-source__slide-hover" onClick={e => this.onClickItem(items, index)} />
						{infoTemplate ? infoTemplate(item) : null}

						{isChecked && <Icon id={CheckIcon} className="carousel-social-source__check"/>}
					</div>
				</LazyLoad>
			</View>
		);
	}

	render() {
		const { items, suffix, height = 140, className } = this.props;
		const { showLeftArrow, showRightArrow, showArrows, viewsToMove } = this.state;
		
		if (!items || !items.length) return null;		

		const itemsList = items.map((item, i) => this.renderItem(item, i));

		return (
			<div className={`carousel-social-source ${className ? className : ""}`} ref={observe(this, this.carouselUpdate)}>
				{showLeftArrow && showArrows ? (
					<SliderArrow
						className="carousel-social-source__arrow carousel-social-source__arrow--prev"
						component="carousel-social"
						side="left"
						onClick={() => this.track.prev()}
					/>
				) : null}
				<ViewPager tag="div" className="carousel-social-source__main">
					<Frame className="carousel-social-source__frame" id={`carousel-social-source__frame--${suffix}`} style={{height: height, maxHeight: height}}>
						<Track
							id={`carousel-social-source__track--${suffix}`}
							ref={c => (this.track = c)}
							viewsToShow='auto'
							viewsToMove={viewsToMove}
							infinite={false}
							className="carousel-social-source__track"
							contain={true}
							swipe={"touch"}
							onViewChange={this.onViewChange}
							style={{height: height}}>
							{itemsList}
						</Track>
					</Frame>
				</ViewPager>
				{showRightArrow && showArrows ? (
					<SliderArrow
						className="carousel-social-source__arrow  carousel-social-source__arrow--next"
						component="carousel-social"
						side="right"
						onClick={() => this.track.next()}
					/>
				) : null}
			</div>
		);
	}
}
