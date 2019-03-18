import React, { Component } from 'react';

import AnimateHeight from 'react-animate-height';
import Icon from '../../icon/index';
import ArrowIcon from '../arrow-up.svg';
import _get from 'lodash/get';

import '../style.scss';
import actions from '../../../actions';
import canUseDom from 'can-use-dom';


export default class CollectionsDropdown extends Component {

  constructor(props) {
    super(props);

    this.state = { showDropdown: false };

    this.triggerClickHandler = this.triggerClickHandler.bind(this);
    this.documentClickHandler = this.documentClickHandler.bind(this);
  }

  componentDidMount() {
    if(!canUseDom) return;
    document.addEventListener("click", this.documentClickHandler);
  }

  componentWillUnmount() {
    if(!canUseDom) return;
    document.removeEventListener("click", this.documentClickHandler);
  }

  handleLinkClick () {
    this.setState({ showDropdown: false})
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

  renderNavItem(title){
    return(
      <li className="dropdown__item">
        <span className="dropdown__item-text">{ title }</span>
      </li>
    )
  }

  render(){

    const { showDropdown } = this.state;
    const { className } = this.props;

    return(
      <div className={`dropdown ${className ? className : ''}`} itemID="dropdown__collections">
        <div  className={`dropdown__trigger ${showDropdown ? 'active' : ''}`} onClick={ e => this.triggerClickHandler(e) }>
          <p>New First</p>
          <Icon id={ArrowIcon} className='dropdown__icon dropdown__icon--arrow'/>
        </div>
        <AnimateHeight
          height={showDropdown ? 'auto' : 0}
          duration={ 200 }
          className = 'dropdown__height-wrapper dropdown__height-wrapper--left'
        >
          <div  className="dropdown__container">
            <div className="dropdown__wrapper">
              <ul className="dropdown__list">
                { this.renderNavItem('New first') }
              </ul>
            </div>
          </div>
        </AnimateHeight>
      </div>
    )
  }
}
