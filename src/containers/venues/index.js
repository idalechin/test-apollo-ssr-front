import React from "react";
import { Link } from "react-router-dom";
import { getVendorUrl } from "../../functions";
import gql from "graphql-tag";
import _get from "lodash/get";
import history from "../../history";
import ServerPagination from "../../components/server-pagination";
import { useQuery } from "react-apollo-hooks";
import VenuesItem from "../../components/venues/venues-item";

import "./style.scss";

const query = gql`
	query vendors($offset: Int, $limit: Int) {
		vendors(category: ["1"], isVenues: true, offset: $offset, limit: $limit) {
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

const Venues = ({ match }) => {
	const page = _get(match, "params.page", 1);
	const pageInt = +page;
	const limit = 20;
	const offset = (pageInt - 1) * limit;
	const vendorsQuery = useQuery(query, {
		variables: {
			offset,
			limit
		}
	});
	const vendors = _get(vendorsQuery, "data.vendors.list", []);
	const pagination = _get(vendorsQuery, "data.vendors.pagination");
	const vendorsLoading = _get(vendorsQuery, "loading");

	const renderItems = items => {
		if (!items || !items.length) return null;
		return items.map(item => (
			<li className="venues__item" key={item.id}>
				<Link to={getVendorUrl(item, "vendor")}>
					<VenuesItem slug={item.slug} />
				</Link>
			</li>
		));
	};

	const onChangePaginationPage = (page, type) => {
		history.push(`/venues/${page}`);
	};

	return (
		<div className="container container--auto-height container--relative">
			<div className="venues__list">
				<ServerPagination
					loading={vendorsLoading}
					currentPage={page}
					pageNumber={pagination && pagination.pageCount}
					onChangePage={onChangePaginationPage}
				>
					{renderItems(vendors)}
				</ServerPagination>
			</div>
		</div>
	);
};

export default Venues;
