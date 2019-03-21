import React, { Component } from "react";
import PropTypes from 'prop-types';
import { useMutation, useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import _get from "lodash/get";

import Button from "../index";
import TurnedFlagIcon from "./ic_turned_in_not_black_24px.svg";
import FlagIcon from "./ic_turned_in_black_24px.svg";

import "../style.scss";

const SaveButton = props => {
  const { type, id, size } = props;
	const className = props.className ? props.className : "";
	const border = props.border ? "btn--secondary-border" : "";
  const vendorIsSaved = useQuery(VENDOR_IS_SAVED, { variables: { id } });
	const isSaved = _get(vendorIsSaved, "data.vendorIsSaved.value");
	const vendorToggleLike = useMutation(TOGGLE_VENDOR_SAVE, {
		variables: { id },
		optimisticResponse: {
			__typename: "Mutation",
			toogleVendorSave: {
        __typename: "VendorSaved",
        id,
        value: !isSaved,
			}
		}
	});

	function onClick(e) {
		if (type === "vendor") {
			vendorToggleLike();
		}
	};

	return (
		<Button
			className={`${className} ${border} btn--icon btn--like ${
				size === "small" ? "btn--small-like" : ""
			}`}
			text={size !== "small" ? "Save" : null}
			icon={isSaved ? FlagIcon : TurnedFlagIcon}
			onClick={onClick}
		/>
	);
};

SaveButton.propTypes = {
  type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
	size: PropTypes.string,
	border: PropTypes.bool
};

export default SaveButton;

export const TOGGLE_VENDOR_SAVE = gql`
	mutation toogleVendorSave ($id: ID!) {
		toogleVendorSave(id: $id){
      id
			value
    }
	}
`;

export const VENDOR_IS_SAVED = gql`
	query vendorIsSaved ($id: ID!) {
		vendorIsSaved(id: $id) {
			id
			value
		}
	}
`;
