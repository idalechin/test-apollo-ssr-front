import React, { Component } from "react";
import { Link } from "react-router-dom";
import canUseDom from "can-use-dom";

import SaveButton from "../../button/button-save";
import Button from "../../button";
import Contacts from "../../contacts";
import IconRolling from "./Rolling.svg";

import { getAvgRespTime } from "../../../functions";
import "./style.scss";

export default class VendorsSocialBar extends Component {
	goToChat(vendor, e) {
		e.nativeEvent.stopImmediatePropagation();
		const { user } = this.props;
		if (user) {
			this.props.chatGoToVendorChannel(vendor);
		} else {
			this.props.setModalData("signup");
		}
	}

	onClaimClick() {
		this.props.userSetClaimingVendor(this.props.vendor.id);
	}

	render() {
		const {
			vendor,
			user,
			chatStatus,
			chatChannelsStatus,
			myWeddingVendors
		} = this.props;
		const disableMessage = user
			? chatStatus !== "success" || chatChannelsStatus !== "success"
			: false;
		const isSaved =
			myWeddingVendors && myWeddingVendors.length
				? myWeddingVendors.some(el => el.id === vendor.id)
				: false;
		const hasLinks =
			vendor.website ||
			vendor.facebook ||
			vendor.twitter ||
			vendor.instagram ||
			vendor.pinterest;
		const reviewedVendors =
			user && user.reviewed_vendors
				? user.reviewed_vendors.map(vendor => vendor.vendor_id)
				: null;

		const userIsReviewer =
			reviewedVendors && reviewedVendors.includes(vendor.id);

		return (
			<div className="vendors-social-bar">
				<div className="vendors-social-bar__buttons-wrapper">
					<SaveButton
						className={`btn--small btn--without-margin btn--margin-bottom btn--full-width ${
							vendor.user_id ? "btn--half-width-sm" : ""
						}`}
						border={true}
						isActive={isSaved}
						vendor={vendor}
					/>
					{vendor.user_id ? (
						<Button
							className="btn--small btn--without-margin btn--full-width btn--half-width-sm btn--message"
							text="Message"
							disable={disableMessage}
							onClick={e => this.goToChat(vendor, e)}
							icon={disableMessage && IconRolling}
						/>
					) : null}
				</div>
				{vendor.avg_response_time && (
					<div className="vendors-social-bar__responds full-screen--sm">
						{`Responds in ${getAvgRespTime(vendor.avg_response_time)}`}
					</div>
				)}

				{hasLinks ? (
					<Contacts
						vendor={vendor}
						beforeOnClick={() => {
							if (canUseDom && window && window.analytics) {
								window.analytics.track("VENDOR_PROFILE_EXTERNAL_LINK_OPEN");
							}
						}}
					/>
				) : null}

				{user && !userIsReviewer && vendor.user_id !== user.id ? (
					<Link
						to={`/vendor-review/${vendor.slug}`}
						className="vendors-social-bar__review"
					>
						Write a Review
					</Link>
				) : null}

				{!user ? (
					<p
						onClick={() => this.props.setModalData("signup")}
						className="vendors-social-bar__review"
					>
						Write a Review
					</p>
				) : null}

				{!user && vendor && !vendor.user_id ? (
					<div className="vendors-social-bar__claim">
						<span>Run this business?</span>
						<Link onClick={this.onClaimClick.bind(this)} to="/signup">
							Claim listing
						</Link>
					</div>
				) : null}
			</div>
		);
	}
}
