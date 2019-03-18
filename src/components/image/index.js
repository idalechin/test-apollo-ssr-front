import React, { useState } from "react";
import NoImage from "./no-image";

import IconPlay from "./Play.svg";
import Icon from "../icon";
import canUseDom from "can-use-dom";
import _get from "lodash/get";
import { getMediaBySize } from "../../functions";
import Measure from "react-measure";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";

import "./style.scss";

export default props => {
	const { className, size, background, hidePlaceholder, imageSrc, id } = props;
	const mediaQuery = useQuery(FETCH_MEDIA, { variables: { id } });
	const image = _get(mediaQuery, "data.media.images.big");
	const isVideo = _get(mediaQuery, "data.media.isVideo");
	const imageExists = image && image.src;
	let src = imageSrc || imageExists;
	const [dimensions, setDimensions] = useState(null);

	function renderImage() {
		if (image && !dimensions) return null;

		const ratio = canUseDom ? window.devicePixelRatio : 1;
		const bg = background ? { backgroundColor: background } : null;

		if (!imageSrc && image && dimensions) {
			const { width, height } = dimensions;
			src = getMediaBySize({
				url: image.src,
				width: width * ratio,
				height: height * ratio,
				imageWidth: image.width,
				imageHeight: image.height,
				resize: size || "cover"
			});
		}

		return (
			<div
				className={`image-wrapper image-wrapper__simple-image ${
					className ? className : ""
				}`}
				style={{
					backgroundImage: `url(${src})`,
					backgroundSize: size ? size : "cover",
					...bg
				}}
			/>
		);
	}

	if (src) {
		return (
			<Measure
				bounds
				onResize={contentRect => {
					setDimensions(contentRect.bounds);
				}}
			>
				{({ measureRef }) => (
					<div ref={measureRef} className="image__body">
						{isVideo ? (
							<div className="image__icon-wrapper">
								<Icon id={IconPlay} className="image__icon" />
							</div>
						) : null}
						{renderImage()}
					</div>
				)}
			</Measure>
		);
	}

	if (hidePlaceholder) return null;

	return <NoImage {...props} />;
};

const FETCH_MEDIA = gql`
	query media($id: ID!) {
		media(id: $id) {
			id
			source
			isVideo
			video_hashed_id
			video_thumbnail
			images {
				big {
					src
					width
					height
				}
			}
		}
	}
`;
