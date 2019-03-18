import React, { Component } from 'react';
import Truncate from 'react-text-truncate';
import {Link} from 'react-router-dom';

import SaveButton from '../../button/button-save';
import Cover from '../../cover';
import Image from '../../image';

import './style.scss';
import _get from "lodash/get";
import {getVendorUrl} from '../../../functions';

export default class VendorCard extends Component {

  renderImage = (vendor) => {
    const {cover, yelp} = vendor;

    if(cover) {
      return (
        <Cover media={ cover } mediaSize="normal"/>
      )
    } else if(yelp) {
      return (
        <Image imageSrc={yelp.image}/>
      )
    } else {
      return (
        <Cover media={cover} mediaSize='small' background={"white"} isContain={true}/>
      )
    }
  };

  render(){
    const { vendor, myWeddingVendors, user } = this.props;
    console.log('vendor: ', vendor);
    const isSaved = myWeddingVendors && myWeddingVendors.length ? myWeddingVendors.some(el => el.id === vendor.id) : false;

    return (
      <div className="vendor-card">
        <Link to={getVendorUrl(vendor, 'vendor')}>
          <div className="vendor-card__cover">
            { this.renderImage(vendor) }
          </div>
        </Link>
        <div className="vendor-card__info">
          <h5 className="vendor-card__title">
            <Link to={getVendorUrl(vendor, 'vendor')}>
              <Truncate text={vendor.title} truncateText="..."/>
            </Link>
          </h5>
          {
            user &&
            <SaveButton
              className="btn--extra-small vendor-card__btn"
              isActive = {isSaved}
              vendor = {vendor}
            />
          }
        </div>
      </div>
    );
  }
}