import React, { Component } from "react";
import { Link } from "react-router-dom";
import _get from "lodash/get";

import MosaicCard from "../../cards/mosaic-card/index";
import Rating from "../../rating/index";
import Cover from "../../cover/index";
import ReviewCount from "../../review-count/index";
import Pricing from "../../pricing/index";

import { getVendorUrl } from "../../../functions";
import "./style.scss";

export default class VendorColaborators extends Component {
	renderInfo(vendor) {
		const rating = vendor.yelp && vendor.yelp.rating ? vendor.yelp.rating : null;
		const reviews = vendor.yelp && vendor.yelp.yelp_review_count ? vendor.yelp.yelp_review_count : null;

		return (
			<div>
				<h5 className="vendor-colaborators__author truncate item-title">{vendor.title}</h5>
				<div className="vendor-colaborators__info">
					<div className="vendor-colaborators__status">
						<Rating rate={rating} smallView={true} />
						<span className="vendor-colaborators__reviews">
							<ReviewCount reviews={reviews} />
						</span>
					</div>
				</div>
			</div>
		);
	}

	renderVendor = (vendor, i) => {
		return (
			<li className="vendor-colaborators__item" key={i}>
				<Link to={getVendorUrl(vendor, "vendor")}>
					<div className="vendor-colaborators__body">
						<MosaicCard data={vendor} className="vendor-colaborators__mosaic-body" />
						{this.renderInfo(vendor)}
					</div>
				</Link>
			</li>
		);
	};

	render() {
		const { favoritesCollections, vendor, showCollections } = this.props;
		const vendors = _get(vendor, "collaborator_vendors", null);

		if (!vendors) return null;

		return (
			<div className="vendor-colaborators">
				<h2>Top Collaborators</h2>
				<ul className="vendor-colaborators__list">{vendors.map(this.renderVendor.bind(this))}</ul>
			</div>
		);
	}
}
