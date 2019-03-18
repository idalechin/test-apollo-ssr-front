import React from 'react';
import _get from "lodash/get";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import LazyLoad from 'react-lazy-load';

import Pricing from '../../pricing';
import VenueSpecificFields from '../../venue/venue-specific-fields';
import MosaicCard from '../../cards/mosaic-card';
import universal from 'react-universal-component'

import './style.scss';

const VendorComponent = universal(import('../../../containers/Vendor'))

export default ({ slug }) => {
	VendorComponent.preload()

  const vendorQuery = useQuery(FETCH_VENDOR, { variables: { slug } });
  const venue = _get(vendorQuery, "data.vendor");
  const categoryQuery = useQuery(FETCH_CATEGORY);
  const category = _get(categoryQuery, "data.category");

	if (!venue) return null;

  function renderInfo() {
    return (
      <div className="venues-item__info-wrapper">
        <div className="venues-item__collection-title">
          <Pricing pricing={venue.price_level}/>
          <h4 className='truncate item-title'>{venue.title}</h4>
        </div>
        <div className="venues-item__info">
          <div className="venues-item__group">
            <VenueSpecificFields category={category} venue={venue} size='small'/>
          </div>
        </div>
      </div>
    );
  }

  return(
    <LazyLoad
      height={'auto'}
      debounce={false}
      offsetVertical={1000}
      className='venues-item__load'
    >
      <div
        className="venues-item"
      >
        <MosaicCard className="venues-item__mosaic-card" data={venue} videoAutoplay={true}/>
        {renderInfo()}
      </div>
    </LazyLoad>
  );
}

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

const FETCH_CATEGORY = gql`
	query {
		category {
			id
			category
		}
	}
`;