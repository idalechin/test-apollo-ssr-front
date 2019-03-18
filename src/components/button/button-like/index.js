import React, { Component } from "react";
import Cookies from 'js-cookie';

import Button from "../index";
import TurnedFlagIcon from "./ic_favorite_border_black_24px.svg";
import FlagIcon from "./ic_favorite_black_24px.svg";

import "../style.scss";

export default class LikeButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: props.isActive || false
    };
  }

  componentWillReceiveProps(newProps) {
    const { isActive } = newProps;
    this.setState({ isActive });
  }

  getLinkByType(type){
    let link = '/account/favorites';
    
    if(type === 'wedding') link = '/account/favorites/weddings';
    if(type === 'collection') link = '/account/favorites/collections';
  
    return link;
  }
  
  getActionByType(){
    const { type, isActive, id } = this.props;
    if(!isActive){
      switch (type) {
        case 'media':
          return this.props.favoritesAddMedia(id);
        case 'wedding':
          return this.props.favoritesAddWedding(id);
        case 'collection':
          return this.props.favoritesAddCollection(id);;
      }
    } else {
      switch (type) {
        case 'media':
          return	this.props.favoritesDeleteMedia(id);
        case 'wedding':
          return this.props.favoritesDeleteWedding(id);
        case 'collection':
          return this.props.favoritesDeleteCollection(id);;
      }
    }
  }

  onClick = e => {
    const { isActive } = this.state;
    const { onClick, user, type, id } = this.props;

    if (!user) {
      e.preventDefault();
      this.props.setModalData("signup");
      const cookies = Cookies.get(`bigdaymade-liked-${type}`);      
      Cookies.set(`bigdaymade-liked-${type}`, cookies && cookies.length ? cookies + '/' + id : id);
    } else {
      this.setState({ isActive: !isActive });
      
      if(!isActive){
        const data = {
          button: [
            {
              text: `Keep Browsing`,
              type: 'primary'
            },
            {
              text: `View Favorites`,
              type: 'primary',
              link: this.getLinkByType(type)
            }
          ],
          text: `Check out liked items under "My Favorites" in your account.`,
          title: `Awesome, you liked something!`
        }
        
        this.props.setModalData('choise', data);
      }

      this.getActionByType();
    }
  };

  render() {
    const { size, text } = this.props;
    const { isActive } = this.state;
    const className = this.props.className ? this.props.className : "";
    const border = this.props.border ? "btn--secondary-border" : "";
    const setText = text ? text : 'Like';
    return (
      <Button
        className={`${className} ${border} btn--icon btn--like ${
          size === "small" ? "btn--small-like" : ""
        }`}
        text={size !== "small" ? setText : null}
        icon={isActive ? FlagIcon : TurnedFlagIcon}
        isActive={isActive}
        onClick={e => this.onClick(e)}
      />
    );
  }
}
