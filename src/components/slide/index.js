import React, { Component } from "react";
import Image from "../image";
import VideoIcon from "./Play.svg";
import Icon from "../icon";
import _get from "lodash/get";

import "./style.scss";
import { setThumbnailSize } from "../../functions";

export default class Slide extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false
		};
	}

	onLoad = () => {
		this.setState({ loaded: true });
	};

	render() {
		const { media, mediaSize, className, isContain, slideBg } = this.props;
		const { loaded } = this.state;

		let image = null;
		let retinaImage = null;
		const coverSize = isContain ? "contain" : "cover";
		const preloaderImage = _get(media, "images.normal", null);
		const normalSrc =
			media && media.id && media.images && mediaSize && media.images[mediaSize]
				? media.images[mediaSize]
				: null;

		if (media) {
			image = media.isVideo
				? {
						src: setThumbnailSize(media.video_thumbnail, 460, 280),
						width: 480,
						height: 480
				  }
				: normalSrc;
			retinaImage =
				media.images && media.images.length
					? media.images[mediaSize + "_x2"].src
					: image;
		}

		return (
			<div className="slide">
				<img
					src={normalSrc && normalSrc.src}
					className="image__hidden-image"
					alt=""
					onLoad={this.onLoad}
				/>
				{!loaded && (
					<div className="slide__preloader-wrapper">
						<Image image={preloaderImage} size={"contain"} />
					</div>
				)}
				<div className="slide__image">
					<Image
						className={className ? className : null}
						image={image}
						imageRatio2={retinaImage}
						size={coverSize}
						background={slideBg || null}
						hidePlaceholder={true}
					/>
					{media.isVideo ? (
						<Icon className="slide__video-icon" id={VideoIcon} />
					) : null}
				</div>
			</div>
		);
	}
}
