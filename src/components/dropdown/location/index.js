import React, { Component } from 'react';

import AnimateHeight from 'react-animate-height';
import _get from 'lodash/get';
import AutocompleteSingle from '../../form-elements/autocomplite-single';

import '../style.scss';
import {getAddressFromObject} from '../../../functions';
import canUseDom from "can-use-dom";

export default class LocationDropdown extends Component {

  constructor(props) {
    super(props);

    this.state = { showDropdown: false };

    this.triggerClickHandler = this.triggerClickHandler.bind(this);
    this.documentClickHandler = this.documentClickHandler.bind(this);
    this.stopClickHandler = this.stopClickHandler.bind(this);
  }

  componentDidMount() {
    if(!canUseDom) return;
    document.addEventListener("click", this.documentClickHandler);
  }

  componentWillUnmount() {
    if(!canUseDom) return;
    document.removeEventListener("click", this.documentClickHandler);
  }

  onOptionSelected(place, viewport){
    if(place && place.city) this.props.geoSetCurrent(place);
    this.props.onPlaceSelected(place, viewport);
    this.setState({ showDropdown: false});
  }

  onShowDropdown(){
    this.setState({ showDropdown: true})
  }

  documentClickHandler() {
    this.setState({ showDropdown: false });
  }

  triggerClickHandler(e) {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  stopClickHandler(e) {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({ showDropdown: this.state.showDropdown });
  }

  clearClickHandler(e) {
    e.nativeEvent.stopImmediatePropagation();
    this.props.clearLastGeo();
  }

  renderNavItem(geo, i){
    return(
      <li key={i} className="dropdown__item" onClick={() => this.onOptionSelected(geo)}>
        <span className="dropdown__item-text">{ getAddressFromObject(geo) }</span>
      </li>
    )
  }

  renderAutocomplete(){
    if(!this.props.autocomplete) return null;

    return(
      <AutocompleteSingle
        onClick = { e => this.stopClickHandler(e) }
        onPlaceSelected = { this.onOptionSelected.bind(this) }
      />
    )
  }

  render(){

    const { showDropdown } = this.state;
    const { className, geo, autocomplete, header, disableDropdown } = this.props;

    if(!autocomplete && !geo && !geo.lastGeos && !geo.lastGeos.length) return null;

    return(
      <div className={`dropdown dropdown--location ${className ? className : ''}`} itemID="dropdown-location">
        <div  className={`dropdown__trigger dropdown__trigger--location ${showDropdown && !disableDropdown ? 'active' : ''}`} onClick={ e => this.triggerClickHandler(e) }>
          { header }
        </div>
        <AnimateHeight
          height={showDropdown && !disableDropdown ? 'auto' : 0}
          duration={ 200 }
          className = 'dropdown__height-wrapper dropdown__height-wrapper--full-width dropdown__height-wrapper--zindex-3'
        >
          <div className="dropdown__container">
            <div className="dropdown__wrapper">

              {this.renderAutocomplete()}

              {
                geo && geo.lastGeos && geo.lastGeos.length ?
                <p className="dropdown__list-header">
                  <span>Recent Searches</span>
                  <span
                    className="dropdown__list-clear"
                    onClick={ e => this.clearClickHandler(e) }
                  >
                    Clear
                  </span>
                </p> :
                null
              }

              {
                geo && geo.lastGeos && geo.lastGeos.length ?
                <ul className="dropdown__list">
                  { geo.lastGeos.map(this.renderNavItem.bind(this)) }
                </ul> :
                null
              }

            </div>
          </div>
        </AnimateHeight>
      </div>
    )
  }
}
