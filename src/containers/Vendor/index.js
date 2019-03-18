import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import _get from "lodash/get";

import Place from "../../components/place";
import Pricing from "../../components/pricing";
import TextTruncate from "../../components/text-truncate";
import VendorsSlider from "../../components/vendor/vendor-slider";

import "./style.scss";

const Component = props => {

	const [showAbout, setShowAbout] = useState(false);

	const { data } = props;
	const vendor = _get(data, "vendor", null);
	
	if(!vendor) return null

	const vendorMedia = _get(vendor, "media", null);
	const vendorMediaLength = vendorMedia && vendorMedia.length;

	return (
		<div className="vendor">
			<div className="vendor__container container">
				<div className="vendor__main">
					<div className="vendor__row">
						<div className="vendor__info">
							<div className="vendor__desc">
								<div className="vendor__desc-blocks">
									<div className="vendor__desc-block vendor__desc-block--info">
										<div className="vendor__desc-row">
											<h1 className="vendor__title">{vendor.title}</h1>
										</div>
										<div className="vendor__desc-row vendor__desc-row--align-center vendor__desc-row--flex-start">
											<Pricing
												className="vendor__pricing"
												pricing={vendor.price_level}
											/>
											<span className="vendor__category">
												{vendor.category &&
													vendor.category.category}
											</span>
											<Place
												data={vendor}
												className="vendor__place  vendor--border-left"
												shortAddress="true"
											/>
										</div>

										{vendor.about && (
											<div className="vendor__about">
												<div className="vendor__text">
													<TextTruncate
														text={vendor.about}
														expanded={showAbout}
														onClick={setShowAbout}
													/>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
					{vendorMediaLength ? <h2>Highlights</h2> : null}
				</div>
			</div>

			<VendorsSlider vendor={vendor} />
		</div>
	);
};

const GET_VENDOR = gql`
	query Vendor($slug: String!) {
		vendor(slug: $slug) {
			id
			title
			category_id
			price_level
			about
			state
			city
			category {
				category
			}
			media {
				id
				source
				images {
					normal {
						src
						width
						height
					}
				}
			}
		}
	}
`;

const Vendor = ({ match }) => {
	const slug = _get(match, "params.slug", null);
	return (
		<Query
			fetchPolicy="cache-and-network"
			query={GET_VENDOR}
			variables={{ slug }}
		>
			{queryProps => <Component {...queryProps} />}
		</Query>
	);
};

export default Vendor;
