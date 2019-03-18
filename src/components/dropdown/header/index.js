import React, { Component } from 'react';
import _get from 'lodash/get';

import {Link} from 'react-router-dom';
import { menuLinks } from '../../../constants/index';
import {checkIsAdmin} from '../../../functions';
import Userpic from '../../userpic/index';
import AnimateHeight from 'react-animate-height';
import canUseDom from 'can-use-dom';

import '../style.scss';
import actions from '../../../actions';

export default class HeaderDropdown extends Component {

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
    this.setState({ showDropdown: true});
  }

  documentClickHandler() {
    this.setState({ showDropdown: false });
  }

  triggerClickHandler(e) {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({ showDropdown: true });
		if(canUseDom && window && window.analytics){
			window.analytics.track('HEADER_MENU_OPEN');
		}
  }

  renderNavItem(title, link){
    return(
      <li className="dropdown__item">
        <Link className="dropdown__link" to={ link ? link : '#' } onClick={this.handleLinkClick.bind(this)}>
          { title }
        </Link>
      </li>
    )
  }

  render(){

    const { user } = this.props;
    const { showDropdown } = this.state;
    const hasVendor = user && user.type === 'business';

    if(!user) return null;

    return(
      <div className="dropdown" itemID="dropdown">
        <div  className="dropdown__trigger" onClick={ e => this.triggerClickHandler(e) }>
          <Userpic media={user.userpic} facebook={user.facebook_image} mediaSize="small"/>
        </div>
        <AnimateHeight
          height={showDropdown ? 'auto' : 0}
          duration={ 200 }
          className = 'dropdown__height-wrapper'
        >
          <div  className="dropdown__container">
            <div className="dropdown__wrapper">
              <ul className="dropdown__list">
                { hasVendor ? this.renderNavItem('Weddings', menuLinks.weddings) : null }
                {/* { this.renderNavItem( hasVendor ? 'Saved Vendors' : 'My Wedding', menuLinks.myWedding) } */}
                { this.renderNavItem('Collections', menuLinks.collections) }
                { this.renderNavItem('Favorites', menuLinks.favorites) }
                {/* { this.renderNavItem('Match', menuLinks.match) } */}
                {hasVendor ? this.renderNavItem('Social Media', menuLinks.socialMedia) : null}
                { checkIsAdmin(user) ? this.renderNavItem('Admin Panel', menuLinks.admin) : null}
                { this.renderNavItem('Account', menuLinks.account) }
              </ul>
            </div>
          </div>
        </AnimateHeight>
      </div>
    )
  }
}
