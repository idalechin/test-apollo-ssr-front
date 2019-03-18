import React, { Component } from "react";
import _get from "lodash/get";
import canUseDom from "can-use-dom";

import Cover from "../../cover";
import Carousel from "../../sliders/carousel";

import "./style.scss";

export default class VendorsSlider extends Component {

	render() {
		const { vendor, foursquarePhotos } = this.props;

		if (!vendor) return null;

		const vendorMedia = _get(vendor, "media", null);
		let media = vendorMedia;

		if(foursquarePhotos && foursquarePhotos.length){
			media = media ? media.concat(foursquarePhotos) : foursquarePhotos;
		}

		if (!media || !media.length) return null;

		return (
			<div className="vendor-slider" id='vendor-slider'>
				<Carousel
					media={media}
					data={vendor}
					interval = {0}
					height={400}
					beforeOnClick={() => {
						if (canUseDom && window && window.analytics) {
							window.analytics.track("VENDOR_PAGE_TOP_ROW_PHOTO_OPEN", {
								vendor_id: vendor.id,
							});
						}
					}}
				/>
			</div>
		);
	}
}
