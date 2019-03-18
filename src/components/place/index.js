import React, { Component } from 'react';
import {getAddressFromObject, getCityFromObject} from "../../functions";

import PlaceIcon from './ic_place_black_24px.svg'
import Icon from '../../components/icon'

import './style.scss';

export default class Place extends Component {
  render() {

    const {className, title, data, shortAddress} = this.props;

    if ( !title && !data) return null;

    const address = shortAddress ? getCityFromObject(data) : getAddressFromObject(data);

    if ( !address || !address.length) return null;

    return(
      <div className={`place truncate ${ className ? className : ''}`}>
        <Icon id={PlaceIcon} className="place__icon"/>
        { address }
      </div>
    );
  };
}

