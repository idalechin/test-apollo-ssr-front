import React, { Component } from "react";
import NoVideo from "./no-video";
import canUseDom from 'can-use-dom';

import { generateRandomID } from "../../functions";
import "./style.scss";

export default class Video extends Component {
	constructor(props) {
		super(props);

		this.uniqKey = generateRandomID();
		this.wistia = canUseDom && window && window.Wistia;
	}

	componentDidMount() {
		const { onRef } = this.props;
		if (onRef) onRef(this);
	}

	componentWillUnmount() {
		const { onRef } = this.props;
		if (onRef) onRef(undefined);
	}

	componentWillReceiveProps(newProps) {
		const { videoAutoplay, play, videoId } = newProps;
		
		if (this.wistia) {
			const video = this.wistia.api(`wistia-uniq-id-${videoId}-${this.uniqKey}`);
			if (video) play ? video.play() : video.pause();
		}
	}

	onVideoPause() {
		const { videoId } = this.props;
		const video = Wistia.api(`wistia-uniq-id-${videoId}-${this.uniqKey}`);
		video.pause();
	}

	onVideoPlay() {
		const { videoId } = this.props;
		const video = Wistia.api(`wistia-uniq-id-${videoId}-${this.uniqKey}`);
		video.play();
	}

	render() {
    if(!canUseDom) return null;

		const {
			videoId,
			backgroundColor,
			muted,
			preload,
			qualityMax,
			playbar,
			endVideoBehavior,
			playButton,
			hideBottomBar,
			size,
			videoFoam,
			fullSize,
			qualityMin,
			autoPlay
		} = this.props;

		let className = `wistia_embed video-wrapper wistia_async_${videoId} playerColor=#ffffff wmode=transparent`;

		if (muted) className += ` muted=${muted}`;
		if (preload) className += ` preload=${preload}`;
		if (qualityMax) className += ` qualityMax=${qualityMax}`;
		if (qualityMin) className += ` qualityMin=${qualityMin}`;
		if (playbar) className += ` playbar=${playbar}`;
		if (playButton) className += ` playButton=${playButton}`;
		if (endVideoBehavior) className += ` endVideoBehavior=${endVideoBehavior}`;
		if (fullSize) className += ` video-wrapper--full-size`;
		if (hideBottomBar) className += ` video-wrapper--hide-bar`;
		if (videoFoam) className += ` videoFoam=${videoFoam}`;
		if (autoPlay) className += ` autoPlay=${autoPlay}`;

		const style = {
			backgroundColor: backgroundColor ? backgroundColor : "#F5F3F1",
			width: size && size.width ? size.width : "100%",
			height: size && size.height ? size.height : "100%",
		};

		if (videoId && videoId.length) {
			return (
				<div className={className} style={style} itemID={videoId} id={`wistia-uniq-id-${videoId}-${this.uniqKey}`}>
					&nbsp;
				</div>
			);
		}

		return <NoVideo {...this.props} />;
	}
}
