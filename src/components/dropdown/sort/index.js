import React, { Component } from 'react';

import AnimateHeight from 'react-animate-height';
import _get from 'lodash/get';

import Icon from '../../icon';
import IconArrow from '../arrow-up.svg';

import '../style.scss';
import canUseDom from "can-use-dom";

export default class SortDropdown extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      showDropdown: false,
      value: null
     };

    this.triggerClickHandler = this.triggerClickHandler.bind(this);
    this.documentClickHandler = this.documentClickHandler.bind(this);
    this.stopClickHandler = this.stopClickHandler.bind(this);
  }

  componentDidMount() {
    const {value, array} = this.props;
    if(!canUseDom) return;
    this.setState({value: value && array && array.length ? array.find(item => item.value === value) : null});
    document.addEventListener("click", this.documentClickHandler);
  }

  componentWillUnmount() {
    if(!canUseDom) return;
    document.removeEventListener("click", this.documentClickHandler);
  }

  componentWillReceiveProps(newProps){
    const {value, array} = newProps;
    this.setState({value: value && array && array.length ? array.find(item => item.value === value) : null});
  }

  onOptionSelected(item){
    this.props.onOptionSelected(item);
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

  renderItem(item, i){
    return(
      <li key={i} className="dropdown__item" onClick={() => this.onOptionSelected(item)}>
        <span className="dropdown__item-text">{ item.label }</span>
      </li>
    )
  }

  render(){

    const { showDropdown, value } = this.state;
    const { className, array, disableDropdown } = this.props;

    if(!array || !array.length) return null;

    return(
      <div className={`dropdown dropdown--sort ${className ? className : ''}`} itemID="dropdown-location">
        <div  className={`dropdown__trigger ${showDropdown && !disableDropdown ? 'active' : ''}`} onClick={ e => this.triggerClickHandler(e) }>
          <b className="dropdown__sort">Sort by:</b> 
          <span className="dropdown__current">
            <span className="truncate">{value && value.label}</span>
            <Icon id={IconArrow} className='dropdown__icon dropdown__icon--arrow'/>
          </span>
        </div>
        <AnimateHeight
          height={showDropdown && !disableDropdown ? 'auto' : 0}
          duration={ 200 }
          className = 'dropdown__height-wrapper dropdown__height-wrapper--full-width dropdown__height-wrapper--zindex-3'
        >
          <div className="dropdown__container">
            <div className="dropdown__wrapper">
              <ul className="dropdown__list">
                {array.map(this.renderItem.bind(this))}
              </ul>
            </div>
          </div>
        </AnimateHeight>
      </div>
    )
  }
}
