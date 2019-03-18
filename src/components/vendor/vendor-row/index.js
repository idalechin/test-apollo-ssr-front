import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

import Carousel from '../../sliders/carousel/index';
import Tag from '../../tag/index';
import Userpic from '../../userpic/index';
import SaveButton from '../../button/button-save';
import Pricing from '../../pricing';
import Place from '../../place';

import './style.scss';
import _get from "lodash/get";
import {getVendorUrl} from '../../../functions';

export default class VendorRow extends Component {

  render() {
    const { vendor, notTag, myWeddingVendors, user } = this.props;
    const media = vendor.media && vendor.media.length ? vendor.media : null;
    const isSaved = myWeddingVendors && myWeddingVendors.length ? myWeddingVendors.some(el => el.id === vendor.id) : false;

    return(
      <LazyLoad
        height={'auto'}
        debounce={false}
        offsetVertical={1000}
        className='vendor-row__load'
      >
        <div className="vendor-section">
          <div className="vendor-row__info">
            <div className="vendor-row__info-left">
              { vendor.user && vendor.user.userpic ?
                <Userpic media={vendor.user.userpic} mediaSize={'small'} className="avatar--margin-right full-screen--sm"/> :
                null }
              <h2 className="vendor-row__title truncate--mobile"><Link to={getVendorUrl(vendor, 'vendor')}>{vendor.title}</Link></h2>
              { !notTag && vendor.category_id !== 1 ? <Tag type="vendor"/> : <Tag type="venue"/>}
              <div className="home-vendor__profession full-screen--sm">
                <Pricing pricing={vendor.price_level} className='vendor-row__pricing'/>
                <span>{ vendor.category_id !== 1 ? ( vendor.category && vendor.category.category ? vendor.category.category : null ) : null}</span>
                { vendor.category_id === 1 ? <Place data={vendor}  shortAddress={true} className='vendor-row__place'/> : null}
              </div>
            </div>
            {
              user &&
              <div className="vendor-row__info-right">
                <SaveButton
                  className="btn--extra-small btn--not-text-mobile"
                  isActive = {isSaved}
                  vendor = {vendor}
                />
              </div>
            }
          </div>
          { media ? <Carousel media={media} data={vendor} albumId={vendor.id} isShuffled={true}/> : null }
        </div>
      </LazyLoad>
    );
  };
}
