import React, { Component } from "react";
import VisibilitySensor from "react-visibility-sensor";
import _get from 'lodash/get';
import _orderBy from 'lodash/orderBy';

import Image from "../../image";
import Video from "../../video";
import Cover from "../../cover";

import "./style.scss";
import { setThumbnailSize } from "../../../functions";

export default class MosaicCard extends Component {
	renderImage(item, size, quality = '244') {
    const { videoAutoplay } = this.props;    

		if (item.isVideo) {
			return videoAutoplay ? (
				<VisibilitySensor>
					{({ isVisible }) => (
						<Video
							videoId={item.video_hashed_id}
							muted="true"
							preload="true"
              qualityMax={quality}
              qualityMin={quality}
							playbar="false"
							endVideoBehavior="loop"
							playButton="false"
							playbar="false"
							hideBottomBar={true}
							play={isVisible}
              videoAutoplay={videoAutoplay}
              videoFoam='false'
              fullSize={true}
						/>
					)}
				</VisibilitySensor>
			) : (
				<Image id={item.id} />
			);
		}

		return <Image id={item.id} />;
	}

	renderOneImage(media) {
		return (
			<div className="mosaic-card__blocks">
				<div className="mosaic-card__block">{this.renderImage(media[0], "big", '360')}</div>
			</div>
		);
	}

	renderTwoImages(media) {
		return (
			<div className="mosaic-card__blocks">
				<div className="mosaic-card__block">{this.renderImage(media[0], "normal", '360')}</div>
				<div className="mosaic-card__block">{this.renderImage(media[1], "normal", '360')}</div>
			</div>
		);
	}

	renderMoreImages(media) {
		return (
			<div className="mosaic-card__blocks">
				<div className="mosaic-card__block">{this.renderImage(media[0], "normal", '360')}</div>
				<div className="mosaic-card__block">
					<div className="mosaic-card__row">{this.renderImage(media[1], "normal", '244')}</div>
					<div className="mosaic-card__row">{this.renderImage(media[2], "normal", '244')}</div>
				</div>
			</div>
		);
	}

	renderCards(mediaArray) {
		const {ignoreMosaicMedia} = this.props
		const checkedMedia = ignoreMosaicMedia ? mediaArray : _orderBy(mediaArray.filter(m => m.mosaic_media), ['mosaic_media'], ['asc']);
		const media = checkedMedia && checkedMedia.length ? checkedMedia : mediaArray;

		if (!media || !media.length) {
			return <Image />;
		} else if (media.length === 1) {
			return this.renderOneImage(media);
		} else if (media.length === 2) {
			return this.renderTwoImages(media);
		} else {
			return this.renderMoreImages(media);
		}
	}

	renderMain() {
		const { data } = this.props;

		if (data && data.media && data.media.length) {
			return this.renderCards(data.media);
		} else if (data && data.yelp) {
			return (
				<div>
					<Image imageSrc={data.yelp.image} />
				</div>
			);
		} else {
			return (
				<div>
					<Cover media={data && data.cover ? data.cover : null} mediaSize="small" background={"white"} />
				</div>
			);
		}
	}

	render() {
		const { data, className, size } = this.props;

		return <div className={`mosaic-card ${className ? className : ""} ${size ? "mosaic-card--" + size : ""}`}>{this.renderMain()}</div>;
	}
}
