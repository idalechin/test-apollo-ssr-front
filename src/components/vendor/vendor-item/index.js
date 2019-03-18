import React, { Fragment } from "react";
import SaveButton from "../../button/button-save";
import MosaicCard from "../../cards/mosaic-card/index";
import LazyLoad from "react-lazy-load";
import { Link } from "react-router-dom";
import _get from "lodash/get";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import universal from 'react-universal-component'

import Rating from "../../rating/index";
import ReviewCount from "../../review-count/index";
import Pricing from "../../pricing/index";

import { getVendorUrl } from "../../../functions";
import "./style.scss";

const VendorComponent = universal(import('../../../containers/Vendor'))

export default ({ slug }) => {
	VendorComponent.preload()
	const vendorQuery = useQuery(FETCH_VENDOR, { variables: { slug } });
	const vendor = _get(vendorQuery, "data.vendor");

	if (!vendor) return null;

	const renderInfo = () => {
		const reviews =
			vendor.yelp && vendor.yelp.yelp_review_count
				? vendor.yelp.yelp_review_count
				: null;

		return (
			<div className="vendor-item__info-wrapper">
				<Link to={getVendorUrl(vendor, "vendor")}>
					<h4 className="vendor-item__author truncate item-title">
						{vendor.title}
					</h4>
					<div className="vendor-item__info">
						<div className="vendor-item__status">
							<Rating rate={vendor.rating} smallView={true} />
							<span className="vendor-item__reviews">
								(<ReviewCount reviews={reviews} />)
							</span>
							<span className="vendor-item__money">
								<Pricing pricing={vendor.price_level} color="orange" />
							</span>
						</div>
					</div>
				</Link>
				<SaveButton id={vendor.id} size="small" border type='vendor'/>
			</div>
		);
	};

	return (
		<li className="vendors__item">
			<LazyLoad
				height={"auto"}
				debounce={false}
				offsetVertical={1000}
				className="vendor-item__load"
			>
				<div className="vendor-item__body">
					{renderInfo()}
					<Link to={getVendorUrl(vendor, "vendor")}>
						<MosaicCard
							data={vendor}
							className="vendor-item__mosaic-body"
							videoAutoplay={true}
						/>
					</Link>
				</div>
			</LazyLoad>
		</li>
	);
};

const FETCH_VENDOR = gql`
	query vendor($slug: String!) {
		vendor(slug: $slug) {
			id
			title
			category_id
			price_level
			about
			state
			city
			slug
			media(count: 3) {
				id
			}
		}
	}
`;
