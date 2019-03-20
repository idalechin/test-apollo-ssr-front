import React, { useState, useEffect } from "react";
import _get from "lodash/get";
import _isEqual from "lodash/isEqual";
import _find from "lodash/find";
import _uniq from "lodash/uniq";
import history from "../../history";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { useStateValue } from "../../state";

import VendorsSidebar from "../../components/vendors/vendors-sidebar";
import VendorItem from "../../components/vendor/vendor-item";
import ServerPagination from "../../components/server-pagination";

import "./style.scss";

const useRefreshPage = args => {
	useEffect(() => {
		history.push("/vendors/1");
	}, args);
};

const Vendors = props => {
	const { match } = props;
	const page = _get(match, "params.page", 1);
	const pageInt = +page;
	const limit = 20;
	const offset = (pageInt - 1) * limit;
	const [{ vendorsFilter }, dispatch] = useStateValue();
	const categoryQuery = useQuery(FETCH_CATEGORY);
	const { sortBy, category, price, distance } = vendorsFilter;
	const vendrosQuery = useQuery(FETCH_VENDORS, {
		variables: {
			sortBy,
			category,
			price,
			distance,
			offset,
			limit
		}
	});
	const vendors = _get(vendrosQuery, "data.vendors.list");
	const pagination = _get(vendrosQuery, "data.vendors.pagination");
	const vendorsLoading = _get(vendrosQuery, "loading");
	const categories = _get(categoryQuery, "data.category");

	const vendorsLength = vendors && vendors.length ? vendors.length : null;
	const vendorsLengthValue =
		vendorsLength && vendorsLength > 25 ? "25+" : vendorsLength;

	useRefreshPage([sortBy, category, price, distance]);

	const renderVendors = vendors => {
		return vendors && vendors.length
			? vendors.map((item, i) => <VendorItem slug={item.slug} key={item.id} />)
			: null;
	};

	const onChangePaginationPage = (page, type) => {
		history.push(`/vendors/${page}`);
	};

	const setFilter = type => payload =>
		dispatch({
			type,
			payload
		});

	const sidebarProps = {
		sortBy: vendorsFilter.sortBy,
		setSortBy: setFilter("setVendorsFilterSort"),
		filterCategory: vendorsFilter.category,
		setFilterCategory: setFilter("setVendorsFilterCategory"),
		filterPrice: vendorsFilter.price,
		setFilterPrice: setFilter("setVendorsFilterPrice"),
		filterDistance: vendorsFilter.distance,
		setFilterDistance: setFilter("setVendorsFilterDistance"),
		categories
	};

	return (
		<div className="container container--auto-height container--relative">
			<VendorsSidebar {...sidebarProps} />
			<div className="vendors__list">
				<ServerPagination
					loading={vendorsLoading}
					currentPage={page}
					pageNumber={pagination && pagination.pageCount}
					onChangePage={onChangePaginationPage}
				>
					{renderVendors(vendors)}
				</ServerPagination>
			</div>
		</div>
	);
};

const FETCH_CATEGORY = gql`
	query {
		category {
			id
			category
		}
	}
`;

const FETCH_VENDORS = gql`
	query vendors(
		$sortBy: String
		$category: [String]
		$price: [Int]
		$distance: [Int]
		$offset: Int
		$limit: Int
	) {
		vendors(
			sortBy: $sortBy
			category: $category
			price: $price
			distance: $distance
			offset: $offset
			limit: $limit
		) {
			id
			list {
				id
				slug
			}
			pagination {
				pageCount
			}
		}
	}
`;

export default Vendors;
